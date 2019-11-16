import { RequestHandler } from 'fastify';

import { config } from '../../../config';

import {
  getChannelPartnersService,
  findChannelPartnerByIdService,
  addChannelPartnerService,
  deleteChannelPartnerByIdService,
  updateChannelPartnerByIdService,
  addChannelPartnerCardService,
  deleteChannelPartnerCardService,
  getChannelPartnerCardsService,
  findChannelPartnersByIdsService,
  getChannelPartnerStatusByNameService,
  findChannelPartnerByEmailService,
  getChannelPartnerPaymentMethodByNameService,
  updateChannelPartnerCardService,
  dropDefaultChannelPartnerCardsService,
} from './channel.service';

import { NotFoundError, BadRequestError, InternalServerError } from '../../exceptions/errors';
import { isValidUUID } from '../../core/validators/uuid.validator';
import { saveToStorage } from '../../core/services/storage.service';
import { sendMail, sendResetPasswordMail } from '../../core/services/mail.service';
import { MailStatus } from '../../core/models/enums/mail';
import { stripe, addCard } from '../../core/services/stripe.service';
import { buildSearchParams, buildSortParams } from './channel.helper';
import { createReport } from '../../core/services/xlsx-report.service';
import { sha256 } from '../../core/services/hash';
import { UserType } from '../../core/models/enums/user';
import {
  addUserResetPasswordTokenService,
  findUserResetPasswordTokenService,
  dropUserResetPasswordTokenService,
} from '../../db/services/reset-password-token.service';
import { ICardData } from '../../core/models/interfaces/stripe';

export const channelPartnerSignInHandler: RequestHandler = async (request, reply) => {
  const { password, email } = request.body;

  const user = await findChannelPartnerByEmailService(email);
  if (!user) {
    throw new BadRequestError('Email or password is wrong');
  }

  if (!user.isCorrectPassword(password)) {
    throw new BadRequestError('Email or password is wrong');
  }
  const serializedPartner = user.serialize();

  reply.send({user: serializedPartner});
};

export const getChannelPartnersHandler: RequestHandler = async (request, reply) => {

  const { limit = 20, offset = 0, filter, orderColumn, orderType } = request.query;

  const filterParams = filter ? JSON.parse(filter) : null;

  const parsedFilterParams = filterParams && buildSearchParams(filterParams);

  const sort = buildSortParams({orderColumn, orderType});

  const cpList = await getChannelPartnersService(sort, parsedFilterParams, offset, limit);
  const serializedRows = cpList.rows.map(cp => cp.serialize());

  reply.status(200).send({...cpList, rows: serializedRows});
};

export const getChannelPartnerByIdHandler: RequestHandler = async (request, reply) => {
  const { id } = request.params;
  if (!isValidUUID(id)) throw new BadRequestError('Channel partner id is wrong');

  const cp = await findChannelPartnerByIdService(id);
  if (!cp) {
    throw new NotFoundError('Channel partner not found');
  }

  const serializedPartner = cp.serialize();

  reply.status(200).send(serializedPartner);
};

export const updateChannelPartnerHandler: RequestHandler = async (request, reply) => {
  const { id } = request.params;
  const { password, newPassword } = request.body;
  if (!isValidUUID(id)) throw new BadRequestError('Channel partner ID is wrong');

  const { payment_method_id, status_id, stripeToken } = request.body;

  if ((payment_method_id && status_id) && (!isValidUUID(payment_method_id) || !isValidUUID(status_id))) {
    throw new BadRequestError('Payment method or status is wrong');
  }

  const partner = await findChannelPartnerByIdService(id);
  if (!partner) throw new NotFoundError('Channel partner not found');

  const newValues = request.body;

  if (newPassword && newPassword.length) {
    if (password && password.length) {
      const chPartner = await findChannelPartnerByIdService(id);
      if (!chPartner.isCorrectPassword(password)) {
        throw new BadRequestError('Old password is wrong');
      }
      newValues.password = sha256(newPassword, config.get('salt4channelPass'));
    } else {
      throw new BadRequestError('Old password is wrong');
    }
  } else {
    delete newValues.password;
  }

  if (newValues.status_name) {
    const status = await getChannelPartnerStatusByNameService(newValues.status_name);
    newValues.status_id = status.id;
    delete newValues.status_name;
  }

  if ( stripeToken ) {
    const fullToken = await stripe.tokens.retrieve(stripeToken.id);

    if (!partner.stripe_customer_id) {
      const customerId = (await stripe.customers.create({
        description: 'Customer for ' + partner.email,
        email: partner.email,
      })).id;
      newValues.stripe_customer_id = customerId;
    }

    const cardData =
      await addCard(partner.email, fullToken, newValues.stripe_customer_id || partner.stripe_customer_id);

    if (cardData.error) {
      throw new BadRequestError(cardData.error);
    }

    const dbCardData = cardData.source as ICardData;
    const cpCard = await addChannelPartnerCardService(id, {
      id: dbCardData.id,
      brand: dbCardData.brand,
      exp_month: dbCardData.exp_month,
      exp_year: dbCardData.exp_year,
      last4: dbCardData.last4,
      default: dbCardData.default,
    });

    if (!cpCard) {
      throw new InternalServerError('Card not added');
    }

    delete newValues.stripeToken;
  }

  if (newValues.avatar) {
    const avatarLink =
      await saveToStorage(
        {data: newValues.avatar[0].data, filename: newValues.avatar[0].filename},
        'common/channel-partners',
      );
    newValues.avatar = avatarLink;
  }

  const updateResult = await updateChannelPartnerByIdService(id, newValues);
  if (!updateResult) throw new InternalServerError('Something went wrong');

  const response = await findChannelPartnerByIdService(id);

  const serializedPartner = response.serialize();

  reply.status(200).send({...serializedPartner});
};

export const addChannelPartnerHandler: RequestHandler = async (request, reply) => {
  const { email, payment_method_id, status_id, payment_method_name, status_name } = request.body;
  const newValues = request.body;

  const partner = await findChannelPartnerByEmailService(email);
  if (partner) {
    throw new BadRequestError('Channel partner already exists');
  }

  if (!payment_method_id && !payment_method_name) {
    throw new BadRequestError('Payment method is wrong');
  }

  if (payment_method_id && !isValidUUID(payment_method_id)) {
    throw new BadRequestError('Payment method is wrong');
  }

  if (payment_method_name) {
    const method = await getChannelPartnerPaymentMethodByNameService(payment_method_name);
    if (!method) {
      throw new BadRequestError('Payment method is wrong');
    } else {
      newValues.payment_method_id = method.id;
    }
  }

  if (!status_id && !status_name) {
    throw new BadRequestError('Channel partner\'s status is wrong');
  }

  if (status_id && !isValidUUID(status_id)) {
    throw new BadRequestError('Channel partner\'s status is wrong');
  }

  if (status_name) {
    const status = await getChannelPartnerStatusByNameService(status_name);
    if (!status) {
      throw new BadRequestError('Channel partner\'s status is wrong');
    } else {
      newValues.status_id = status.id;
    }
  }

  if (newValues.password) {
    newValues.password = sha256(request.body.password, config.get('salt4channelPass'));
  }

  newValues.token = '';

  if (newValues.avatar) {
    const avatarLink =
      await saveToStorage(
        {data: newValues.avatar[0].data, filename: newValues.avatar[0].filename},
        'common/channel-partners',
      );
    newValues.avatar = avatarLink;
  }

  const response = await addChannelPartnerService(newValues);
  reply.status(200).send(response);
};

export const deleteChannelPartnerByIdHandler: RequestHandler = async (request, reply) => {
  const { id } = request.params;
  if (!id || !isValidUUID(id)) throw new BadRequestError('Channel partner ID is wrong');

  const partner = await findChannelPartnerByIdService(id);
  if (!partner) throw new BadRequestError('Channel partner ID is wrong');

  const deleteResult = await deleteChannelPartnerByIdService(id);
  if (!deleteResult) throw new InternalServerError('Something went wrong');

  reply.status(204).send();
};

export const channelPartnerInviteHandler: RequestHandler = async (request, reply) => {
  const { email } = request.body;

  const mailResult: MailStatus = await sendMail({
    to: email,
    subject: '[LeanLogic] Channel partner invite',
    // tslint:disable-next-line:max-line-length
    html: `To register in LeanLogic, please follow the <a href="${config.get('channelPartnerInviteLink')}"><b>link</b></a>`,
  });

  if (mailResult === MailStatus.ABORTED) throw new InternalServerError('Invation mail not sent');

  reply.status(204).send();
};

export const deleteStripeSourceFromCustomerHandler: RequestHandler = async (request, reply) => {
  const { id } = request.params;
  const { sourceId } = request.body;

  const partner = await findChannelPartnerByIdService(id);
  if (!partner) {
    throw new NotFoundError('Channel partner not found');
  }

  const customerId = partner.stripe_customer_id;
  if (!customerId) {
    throw new BadRequestError('Invalid stripe customer ID');
  }

  try {
    await stripe.customers.deleteSource(customerId, sourceId);
  } catch (stripeErr) {
    throw new NotFoundError('Card not found');
  }

  await deleteChannelPartnerCardService(sourceId);

  reply.status(204).send();
};

export const setDefaultSourceHandler: RequestHandler = async (request, reply) => {
  const { id } = request.params;
  const { source } = request.body;

  let sourceId;

  try {
    sourceId = (await getChannelPartnerCardsService(id)).filter(el => el.id === source)[0].stripe_card_id;
  } catch (e) {
    throw new InternalServerError(e.message);
  }

  const partner = await findChannelPartnerByIdService(id);
  if (!partner) {
    throw new NotFoundError('Channel partner not found');
  }

  await stripe.customers.update(partner.stripe_customer_id, {default_source: sourceId});

  try {
    await dropDefaultChannelPartnerCardsService(id);
    await updateChannelPartnerCardService(partner.id, sourceId, { default: true });
  }
  catch (exception) {
    throw new InternalServerError('Something went wrong');
  }
  const updatedPartner = await findChannelPartnerByIdService(id);
  reply.send(updatedPartner.serialize());
};

export const verifyChannelPartnersHandler: RequestHandler = async (request, reply) => {
  const { ids } = request.body;
  if (!ids.length) {
    throw new BadRequestError('Channel partner\'s ids is wrong');
  }

  const notVerifiedUsersPromises: Promise<string>[] = ids.map(async (id: string) => {
    const cpCards = await getChannelPartnerCardsService(id);

    if (cpCards.length) {
      updateChannelPartnerByIdService(id, {verified: true});
    } else {
      return id;
    }
  });

  let notVerifiedUsers = await Promise.all(notVerifiedUsersPromises);
  notVerifiedUsers = notVerifiedUsers.filter(el => el);

  reply.status(200).send({notVerifiedUsers});
};

export const multipleDeleteChannelPartnersHandler: RequestHandler = async (request, reply) => {
  const { ids } = request.body;
  if (!ids.length) {
    throw new BadRequestError('Channel partner\'s ids is wrong');
  }

  const deletedCount = await deleteChannelPartnerByIdService(ids);
  if (deletedCount !== ids.length) {
    throw new BadRequestError('Some of the IDs are wrong');
  }

  reply.status(204).send();
};

export const channelPartnerReportXlsxHandler: RequestHandler = async (request, reply) => {
  const { ids } = request.body;

  if (!ids.length || ids.some((x: string) => !isValidUUID(x))) {
    throw new BadRequestError('Channel partner ids is wrong');
  }

  const channelPartners = await findChannelPartnersByIdsService(ids).then(cp => cp.map(x => x.serialize()));
  const reportFile = await createReport(channelPartners);
  reply.header('Content-disposition', 'attachment; filename=' + `LL_CH_Report.xlsx`);
  reply.send(reportFile);
};

export const resetChannelPasswordHandler: RequestHandler = async (request, reply) => {
  const { email } = request.body;

  const user = await findChannelPartnerByEmailService(email);
  if (!user) {
    throw new NotFoundError('Channel partner not found');
  }

  const tokenRec = await addUserResetPasswordTokenService(email, UserType.CHANNEL_PARTNER);
  if (!tokenRec) {
    throw new InternalServerError('Something went wrong');
  }

  sendResetPasswordMail(email, tokenRec.token, UserType.CHANNEL_PARTNER, user.instance_frontend_address);

  reply.status(204).send();
};

export const updateChannelPasswordHandler: RequestHandler = async (request, reply) => {
  const { resetPasswordToken, password } = request.body;

  const tokenData = await findUserResetPasswordTokenService(resetPasswordToken);
  if (!tokenData) throw new BadRequestError('Reset password token is invalid');

  const updatedUser = await findChannelPartnerByIdService(tokenData.channel_partner_id);
  if (!updatedUser) throw new NotFoundError('User not found');

  const hashedPass = sha256(password, config.get('salt4channelPass'));
  const updatePasswordResult = await updateChannelPartnerByIdService(updatedUser.id, {password: hashedPass});
  if (!updatePasswordResult) throw new InternalServerError('Something went wrong');

  const isRecordRemoved = await dropUserResetPasswordTokenService(resetPasswordToken);
  if (!isRecordRemoved) throw new BadRequestError('Reset password token is invalid');

  reply.status(204).send();
};

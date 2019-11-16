import JWT from 'jsonwebtoken';
import { FastifyRequest } from 'fastify';
import { IJWTDecoded } from '../models/interfaces/jwt';
import { TokenType } from '../models/enums/jwt';
import { findAdminByIdService } from '../../routes/admin/admin.service';
import { getChannelPartnerByTokenService } from '../../routes/channel-partner/channel.service';
import { findTrustedUserByTokenService } from '../../db/services/trusted-users.service';

export const authenticateAdmin = async (request: FastifyRequest): Promise<string> => {
    try {
        await request.jwtVerify();
    } catch (exception) {
        return exception.message;
    }

    const tokenKey = request.headers.authorization.split(' ')[1];
    const decoded: IJWTDecoded = JWT.decode(tokenKey) as IJWTDecoded;
    if (decoded.type !== TokenType.SUPER_ADMIN) {
        return `Token type is ${decoded.type} but required ${TokenType.SUPER_ADMIN}`;
    }

    const user = await findAdminByIdService(request.user.id);
    if (!user || user.id !== decoded.id) {
        return 'Admin not found';
    }
    request.user = user;
};

export const authenticateChannel = async (request: FastifyRequest): Promise<string> => {
    try {
        await request.jwtVerify();
    } catch (exception) {
        return exception.message;
    }

    const tokenKey = request.headers.authorization.split(' ')[1];
    const decoded: IJWTDecoded = JWT.decode(tokenKey) as IJWTDecoded;
    if (decoded.type !== TokenType.CHANNEL_PARTNER) {
        return `Token type is ${decoded.type} but required ${TokenType.CHANNEL_PARTNER}`;
    }

    const partner = await getChannelPartnerByTokenService(tokenKey);
    if (!partner || partner.id !== decoded.id) {
        return 'Channel partner not found';
    }
};

export const authenticateLanding = async (request: FastifyRequest): Promise<string> => {
    try {
        await request.jwtVerify();
    } catch (exception) {
        return exception.message;
    }

    const tokenKey = request.headers.authorization.split(' ')[1];
    const decoded: IJWTDecoded = JWT.decode(tokenKey) as IJWTDecoded;
    if (decoded.type !== TokenType.LANDING) {
        return `Token type is ${decoded.type} but required ${TokenType.LANDING}`;
    }

    const user = await findTrustedUserByTokenService(tokenKey);
    if (!user || user.id !== decoded.id) {
        return 'Trusted user not found';
    }
};

'use strict';
const uuid4 = require('uuid/v4');
const faker = require('faker');
const JWT = require('jsonwebtoken');

const jwtSign = (payload, expiresIn = '3h') => {
  return JWT.sign(payload, 'D8yKG88Cmrpfzx7kPJ91wB2ScI0qcD1I0B7JrTJP', {
    expiresIn,
    issuer: 'SAdmin',
  });
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const statuses = (await queryInterface.sequelize.query('SELECT "id", "name" FROM "channel_partner_statuses"'))[0];
    const paymentMethod = (await queryInterface.sequelize.query('SELECT "id", "name" FROM "channel_partner_payment_methods"'))[0];

    // const template = {
    //   id: uuid4(),
    //   name: 'A',
    //   company: 'Test Company Inc.',
    //   email: 'channel-partner@test.com',
    //   phone: '+1234567890',
    //   address: '',
    //   order_price: 0.2,
    //   sms_price: 0.2,
    //   margin: 0.2,
    //   payment: 0.2,
    //   subscription_due_date: new Date(),
    //   payment_method: 'Stripe',
    //   status: 'Active',
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // };

    // const chps = [{
    //   id: uuid4(),
    //   name: 'A',
    //   company: 'Test Company Inc.',
    //   email: 'channel-partner@test.com',
    //   phone: '+1234567890',
    //   address: '',
    //   order_price: 0.2,
    //   sms_price: 0.2,
    //   margin: 0.2,
    //   payment: 0.2,
    //   subscription_due_date: new Date(),
    //   payment_method: 'Stripe',
    //   status: 'Active',
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // },
    // {
    //   id: uuid4(),
    //   name: 'B',
    //   company: 'Test Company Inc. number 2',
    //   email: 'channel-partner@test2.com',
    //   phone: '+12345678901143432',
    //   address: '',
    //   order_price: 0.1,
    //   sms_price: 0.1,
    //   margin: 0.1,
    //   payment: 1,
    //   subscription_due_date: new Date(),
    //   payment_method: 'Stripe',
    //   status: 'Inactive',
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // },
    // {
    //   id: uuid4(),
    //   name: 'z',
    //   company: 'Test Company Inc. number 3',
    //   email: 'channel-partner@test3.com',
    //   phone: '+1234567890111',
    //   address: '',
    //   order_price: 0.5,
    //   sms_price: 0.8,
    //   margin: 0.9,
    //   payment: 200,
    //   subscription_due_date: new Date(),
    //   payment_method: 'Stripe',
    //   status: 'Blocked',
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // }];
    const chps = [];
    const data = ['Active', 'Blocked', 'Inactive'];
    const getRandomNumber = () => Math.floor(Math.random() * 3) + 0;
    for (let i = 0; i < 10000; i ++ ) {
      const status = data[getRandomNumber()];
      const id = uuid4();

      const tpm = {
        id,
        token: jwtSign({id, type: 'ChannelPartner'}, '100y'),
        name: faker.name.findName(),
        company: faker.company.companyName(),
        email: faker.internet.email(),
        password: '81a5ae310d0fcb2de2b105bf49351971de2df4d4899dabf88e35768103fa8e5f', // 123456
        phone: faker.phone.phoneNumber(),
        address: `${faker.address.county()} ${faker.address.streetAddress()}`,
        order_price: faker.random.number(),
        sms_price: faker.random.number(),
        margin: faker.random.number(),
        payment: faker.random.number(),
        subscription_due_date: new Date(),
        payment_method: 'Stripe',
        status: status,
        instance_backend_address: 'http://localhost:3001/',
        instance_frontend_address: 'http://localhost:3000/',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      chps.push(tpm);
    }
    const status = data[getRandomNumber()];
    chps.push({
      id: '0c467759-25e1-4e09-a762-89cb7db90e87',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBjNDY3NzU5LTI1ZTEtNGUwOS1hNzYyLTg5Y2I3ZGI5MGU4NyIsInR5cGUiOiJDaGFubmVsUGFydG5lciIsImlhdCI6MTU2NDQ5NDg4NSwiZXhwIjo0NzIwMjU0ODg1LCJpc3MiOiJTQWRtaW4ifQ.J7H9R8W3dyJNIHjn0YJ7O6RqVhmkYuyN39NKT8fjtdQ',
      name: 'Test user',
      company: faker.company.companyName(),
      email: 'channel_partner@test.com',
      password: '81a5ae310d0fcb2de2b105bf49351971de2df4d4899dabf88e35768103fa8e5f', // 123456
      phone: faker.phone.phoneNumber(),
      address: `${faker.address.county()} ${faker.address.streetAddress()}`,
      order_price: faker.random.number(),
      sms_price: faker.random.number(),
      margin: faker.random.number(),
      payment: faker.random.number(),
      subscription_due_date: new Date(),
      payment_method: 'Stripe',
      status: status,
      instance_backend_address: 'http://localhost:3001/',
      instance_frontend_address: 'http://localhost:3000/',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const channelPartners = chps.map(({status, payment_method, ...others}) => {
      const paymentMethodCh = paymentMethod.find(pm => pm.name === payment_method);
      const statusCh = statuses.find(st => st.name === status);

      return {
        ...others,
        payment_method_id: paymentMethodCh.id,
        status_id: statusCh.id,
      }
    });


    return queryInterface.bulkInsert('channel_partners', channelPartners, {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('channel_partners', null, {});
  }
};

'use strict';
// const uuid4 = require('uuid/v4');
const JWT = require('jsonwebtoken');

const jwtSign = (payload, expiresIn = '3h') => {
  return JWT.sign(payload, 'D8yKG88Cmrpfzx7kPJ91wB2ScI0qcD1I0B7JrTJP', {
    expiresIn,
    issuer: 'SAdmin',
  });
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    // const id = uuid4();
    return queryInterface.bulkInsert('trusted_users', [{
      id: 'bcebb640-1f34-4bb5-a43e-875cfa7c3a50',
      // token: jwtSign({id, type: 'Landing'}, '100y'),
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJjZWJiNjQwLTFmMzQtNGJiNS1hNDNlLTg3NWNmYTdjM2E1MCIsInR5cGUiOiJMYW5kaW5nIiwiaWF0IjoxNTY0NDk0ODg3LCJleHAiOjQ3MjAyNTQ4ODcsImlzcyI6IlNBZG1pbiJ9.nHuRlkycza5FqyEHHJrx8QXkApChLFtJMBXHcsdoS9w',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('trusted_users', null, {});
  }
};

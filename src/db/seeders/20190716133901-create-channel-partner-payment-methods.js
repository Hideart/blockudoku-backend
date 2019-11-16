'use strict';
const uuid4 = require('uuid/v4');

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('channel_partner_payment_methods', [{
        id: uuid4(),
        name: 'Stripe',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('channel_partner_payment_methods', null, {});
  }
};

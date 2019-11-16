'use strict';
const uuid4 = require('uuid/v4');

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('channel_partner_statuses', [{
        id: uuid4(),
        name: 'Active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid4(),
        name: 'Inactive',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid4(),
        name: 'Blocked',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('channel_partner_statuses', null, {});
  }
};

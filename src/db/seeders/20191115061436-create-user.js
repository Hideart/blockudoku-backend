'use strict';
const uuid4 = require('uuid/v4');

module.exports = {
  up: (queryInterface) => {
      return queryInterface.bulkInsert('users', [{
        id: uuid4(),
        email: 'daniil@hideart.ru',
        first_name: 'Daniil',
        last_name: 'Petrov',
        nickname: 'CR33PY',
        password: '123456', // 123456
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};

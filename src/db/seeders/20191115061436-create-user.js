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
        password: '31d362a237983381b515c82414436cc0c22d0b0d63cd3eb9a6f1872114e5a310', // 123456
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};

'use strict';
const uuid4 = require('uuid/v4');

module.exports = {
  up: (queryInterface, Sequelize) => {
      queryInterface.bulkInsert('admins', [{
        id: uuid4(),
        email: 'eugene@wellyes.ru',
        first_name: 'Robin',
        last_name: 'Bobin',
        password: 'fec8e66980fe45d8cb97d7bc910ff4585ca256620ed08f887c7f05655be33d78', // 123456
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});

      queryInterface.bulkInsert('admins', [{
        id: uuid4(),
        email: 'd.petrov@wellyes.ru',
        first_name: 'Robin',
        last_name: 'Bobin',
        password: 'fec8e66980fe45d8cb97d7bc910ff4585ca256620ed08f887c7f05655be33d78', // 123456
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});

      return queryInterface.bulkInsert('admins', [{
        id: uuid4(),
        email: 'admin@test.com',
        first_name: 'Robin',
        last_name: 'Bobin',
        password: 'fec8e66980fe45d8cb97d7bc910ff4585ca256620ed08f887c7f05655be33d78', // 123456
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('admins', null, {});
  }
};

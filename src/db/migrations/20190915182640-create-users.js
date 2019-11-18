module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    email: {
      allowNull: true,
      type: Sequelize.STRING(30),
    },
    first_name: {
      allowNull: true,
      type: Sequelize.STRING(30),
    },
    last_name: {
      allowNull: true,
      type: Sequelize.STRING(30),
    },
    nickname: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    balance: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 3,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    deletedAt: {
      allowNull: true,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('users')
};

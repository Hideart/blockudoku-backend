module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    first_name: {
      allowNull: false,
      type: Sequelize.STRING(30),
    },
    last_name: {
      allowNull: false,
      type: Sequelize.STRING(30),
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING(30),
    },
    phone: {
      allowNull: true,
      type: Sequelize.STRING(30),
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    avatar: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    role_id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'roles',
        keys: 'id',
      },
      onDelete: 'set null',
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

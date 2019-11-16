module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('notifications', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    notification_type: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'notification_types',
        keys: 'id',
      },
      onDelete: 'cascade',
    },
    user_id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        keys: 'id',
      },
      onDelete: 'cascade',
    },
    message: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('notifications')
};

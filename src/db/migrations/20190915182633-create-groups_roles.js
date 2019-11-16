module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('groups_roles', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    group_id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'groups',
        keys: 'id',
      },
      onDelete: 'cascade',
    },
    role_id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'roles',
        keys: 'id',
      },
      onDelete: 'cascade',
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
  down: (queryInterface) => queryInterface.dropTable('groups_roles')
};

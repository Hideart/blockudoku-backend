module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('news', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    cover: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    author_id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        keys: 'id',
      },
      onDelete: 'cascade',
    },
    pinned: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    views: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    publishAt: {
      type: Sequelize.DATE,
      allowNull: true,
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
  down: (queryInterface) => queryInterface.dropTable('news')
};

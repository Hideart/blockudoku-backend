module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('comments', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    news_id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'news',
        keys: 'id',
      },
      onDelete: 'cascade',
    },
    page_id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'pages',
        keys: 'id',
      },
      onDelete: 'cascade',
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
  down: (queryInterface) => queryInterface.dropTable('comments')
};

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Posts extends Model {}

Posts.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    posted_by: {
      type: DataTypes.STRING,
      references: {
        model: 'users',
        key: 'username'
      }
    },
    post_content: {
      type: DataTypes.TEXT
    },
    is_group_post: {
      type: DataTypes.BOOLEAN
    },
    for_group: {
      type: DataTypes.STRING,
      references: {
        model: 'groups',
        key: 'group_name'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'posts',
  }
);

module.exports = Posts;
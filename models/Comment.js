const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comments extends Model {}

Comments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    on_post: {
        type: DataTypes.INTEGER,
        references: {
            model: "posts",
            key: 'id'
        }
    },
    comment_by: {
      type: DataTypes.STRING,
      references: {
        model: 'users',
        key: 'username'
      }
    },
    comment_content: {
      type: DataTypes.TEXT
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comments',
  }
);

module.exports = Comments;
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Friends extends Model {}

Friends.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user: {
      type: DataTypes.STRING,
      references: {
        model: 'users',
        key: 'username'
      }
    },
    friend: {
      type: DataTypes.STRING,
      references: {
        model: 'users',
        key: 'username'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'friends',
  }
);

module.exports = Friends;
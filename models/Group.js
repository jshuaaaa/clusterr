const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Groups extends Model {}

Groups.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    group_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'groups',
  }
);

module.exports = Groups;
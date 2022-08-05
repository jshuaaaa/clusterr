const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserGroups extends Model {}

UserGroups.init(
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
      references: {
        model: 'groups',
        key: 'group_name'
      }
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
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
    modelName: 'usergroups',
  }
);

module.exports = UserGroups;
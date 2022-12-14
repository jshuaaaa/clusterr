const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Groups extends Model {}

Groups.init(
  {
    group_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    is_paid: {
      type: DataTypes.BOOLEAN
    },
    cost: {
      type: DataTypes.DECIMAL(10,4)
    },
    ownedBy: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "users",
        key: "username"
      }
    }
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
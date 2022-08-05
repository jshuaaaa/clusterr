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
    is_paid: {
      type: DataTypes.BOOLEAN
    },
    cost: {
      type: DataTypes.DECIMAL
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
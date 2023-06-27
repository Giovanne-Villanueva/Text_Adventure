const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Equipment extends Model {}

Equipment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    equipment_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ability:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    stats_id:{
        type: DataTypes.INTEGER,
        references: {
            model: 'stats',
            key: 'id',
        },
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'equipment',
  }
);

module.exports = Equipment;
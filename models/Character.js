const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Character extends Model {}

Character.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    character_name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    healthpoints:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 20
    },
    height:{
      type: DataTypes.INTEGER
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
    },
    stats_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'stats',
          key: 'id',
        },
    },
    equipment_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'equipment',
          key: 'id',
        },
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'character',
  }
);

module.exports = Character;
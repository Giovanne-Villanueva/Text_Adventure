const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Character extends Model {}

User.init(
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
    user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
    },
    // stats_id: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //       model: 'stats',
    //       key: 'id',
    //     },
    // },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false
      },
    Attack: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    Defense: {
      type: DataTypes.INTEGER,
      AllowNull: false,

    },
    Agility: {
      type: DataTypes.INTEGER,
      AllowNull: false
    },
    
    equipment_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'equipment',
          key: 'id',
      },
  }},
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'character',
  }
);

module.exports = Character;
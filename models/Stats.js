const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Project extends Model {}

Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    hp:{
        type: DataTypes.INTEGER,
    },
    Attack:{
        type: DataTypes.INTEGER,
    },
    Defense:{
        type: DataTypes.INTEGER,
    },
    Agility:{
        type: DataTypes.INTEGER,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'stats',
  }
);

module.exports = Project;

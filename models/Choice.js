const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Choice extends Model {}

Choice.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    choice:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    effect:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    chosen:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'choice',
  }
);

module.exports = Choice;
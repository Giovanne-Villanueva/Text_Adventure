const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Story extends Model {}

Story.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tale:{
        type: DataTypes.STRING(3000),
        allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'story',
  }
);

module.exports = Story;
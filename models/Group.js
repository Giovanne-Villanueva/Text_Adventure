const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Group extends Model {}

Group.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    story_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'story',
          key: 'id',
        },
    },
    choice_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'choice',
          key: 'id',
        },
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'group',
  }
);

module.exports = Group;
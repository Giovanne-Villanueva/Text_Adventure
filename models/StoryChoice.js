const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class StoryChoice extends Model {}

StoryChoice.init(
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
    },
    next_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'story',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'storyChoice',
  }
);

module.exports = StoryChoice;
const sequelize = require('../config/connection');
const { User, Character, Stats, Equipment, Story, Choice, StoryChoice } = require('../models');

const userData = require('./userData.json');
const characterData = require('./charData.json');
const statsData = require('./statsData.json');
const storyData = require('./storyData.json');
const choiceData = require('./choiceData.json');
const groupData = require('./groupData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const stats = await Stats.bulkCreate(statsData);

  for (const character of characterData) {
    await Character.create({
      ...character
    });
  }

  const story  = await Story.bulkCreate(storyData);

  const choice = await Choice.bulkCreate(choiceData);

  const group = await StoryChoice.bulkCreate(groupData);
  
  process.exit(0);
};

seedDatabase();
const sequelize = require('../config/connection');
const { User, Character, Stats, Equipment, Story,  } = require('../models');

const userData = require('./userData.json');
const characterData = require('./charData.json');
const statsData = require('./statsData.json')

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

  process.exit(0);
};

seedDatabase();
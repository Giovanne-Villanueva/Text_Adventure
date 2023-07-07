const User = require('./User');
const Character = require('./Character');
// const Stats = require('./Stats');
const Equipment = require('./Equipment');
const Group = require('./Group')
const Choice = require('./Choice')
const Story = require('./Story')


User.hasOne(Character, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Character.belongsTo(User, {
  foreignKey: 'user_id'
});
Stats.belongsTo(Character, {
  foreignKey: 'stats_id'

User.belongsTo(Story,{
  foreignKey:'save'
});

Story.hasMany(User, {
  foreignKey:'save'
});

Story.belongsToMany(Choice,{
  through: Group
});

Choice.belongsToMany(Story,{
  through: Group
});

module.exports = { 
  User, 
  Character, 
  Equipment, 
  Stats, 
  Story, 
  Choice, 
  StoryChoice 
};
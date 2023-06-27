const User = require('./User');
const Character = require('./Character');
const Stats = require('./Stats');
const Equipment = require('./Equipment');
const Item = require('./Item')


User.hasOne(Character, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Character.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Project };
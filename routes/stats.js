const router = require('express').Router();
const stats = require('../../models/stats');


// GET all stats
router.get('/', (req, res) => {
  // Get all statss from the stats table
  stats.findAll().then((statsData) => {
    res.json(statsData);
  });
});


// GET a single stats
router.get('/:id', (req, res) => {
  // Find a single stats by its primary key (stats_id)
  stats.findByPk(req.params.id).then((statsData) => {
    res.json(statsData);
  });
});


// CREATE multiple statss
router.post('/seed', (req, res) => {
    stats.bulkCreate([
        User.init(
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
        
        )
      
          
      
  ])
    .then(() => {
      res.send('Database seeded!');
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;

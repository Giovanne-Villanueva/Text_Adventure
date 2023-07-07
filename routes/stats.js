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
            "hp": 2,
            "Attack": 8,
            "Defense": 8,
            "Agility": 2
            },
            {
            "hp": 6,
            "Attack": 2,
            "Defense": 8,
            "Agility": 4
            },
            { 
            "hp": 5,
            "Attack": 5,
            "Defense": 5,
            "Agility": 5
            },
            {
            "hp": 4,
            "Attack": 6,
            "Defense": 6,
            "Agility": 4
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

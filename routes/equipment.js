const router = require('express').Router();
const equipment = require('../../models/equipment');

// GET all equipments
router.get('/', (req, res) => {
  // Get all equipments from the equipment table
  equipment.findAll().then((equipmentData) => {
    res.json(equipmentData);
  });
});



// GET a single equipment
router.get('/:id', (req, res) => {
  // Find a single equipment by its primary key (equipment_id)
  equipment.findByPk(req.params.id).then((equipmentData) => {
    res.json(equipmentData);
  });
});

// CREATE a equipment
router.post('/', (req, res) => {
  equipment.create(req.body)
    .then((newEquipment) => {
      res.json(newEquipment);
    })
    .catch((err) => {
      res.json(err);
    });
});

// CREATE multiple equipments
router.post('/seed', (req, res) => {
  equipment.bulkCreate([
    {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        equipment_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        ability: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        stats_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'stats',
            key: 'id',
          },
        }
      },
    
  ])
    .then(() => {
      res.send('Database seeded!');
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;

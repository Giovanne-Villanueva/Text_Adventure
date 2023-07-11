const router = require('express').Router();
const { where } = require('sequelize');
const { Equipment, Stats } = require('../../models');

// GET all equipments
router.get('/', (req, res) => {
  // Get all equipments from the equipment table
  Equipment.findAll().then((equipmentData) => {
    res.json(equipmentData);
  });
});



// GET a single equipment
router.get('/:id', (req, res) => {
  // Find a single equipment by its primary key (equipment_id)
  Equipment.findByPk(req.params.id).then((equipmentData) => {
    res.json(equipmentData);
  });
});

// CREATE a equipment
router.post('/', (req, res) => {
  Equipment.create(req.body)
    .then((newEquipment) => {
      res.json(newEquipment);
    })
    .catch((err) => {
      res.json(err);
    });
});

// CREATE multiple equipments
router.post('/seed', (req, res) => {
  Equipment.bulkCreate([
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
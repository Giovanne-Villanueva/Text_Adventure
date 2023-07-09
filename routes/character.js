const router = require('express').Router();
const Character = require('../../models/Character');


// GET all character
router.get('/', (req, res) => {
  // Get all characters from the character table
  Character.findAll().then((characterData) => {
    res.json(characterData);
  });
});


// GET a single character
router.get('/:id', (req, res) => {
  // Find a single character by its primary key (character_id)
  Character.findByPk(req.params.id).then((characterData) => {
    res.json(characterdata);
  });
});

// CREATE a character
router.post('/', (req, res) => {
  character.create(req.body)
    .then((newCharacter) => {
      res.json(newCharacter);
    })
    .catch((err) => {
      res.json(err);
    });
});

// CREATE multiple characters
router.post('/seed', (req, res) => {
    Character.bulkCreate([
        User.init(
          {
            id: {
              type: DataTypes.INTEGER,
              allowNull: false,
              primaryKey: true,
              autoIncrement: true,
            },
            character_name:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.INTEGER,
                references: {
                  model: 'user',
                  key: 'id',
                },
            },
            stats_id: {
                type: DataTypes.INTEGER,
                references: {
                  model: 'stats',
                  key: 'id',
                },
            },
            equipment_id: {
                type: DataTypes.INTEGER,
                references: {
                  model: 'equipment',
                  key: 'id',
                },
            }
          },
          {
            sequelize,
            timestamps: false,
            freezeTableName: true,
            underscored: true,
            modelName: 'character',
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

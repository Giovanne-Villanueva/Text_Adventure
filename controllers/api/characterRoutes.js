const router = require('express').Router();
const { where } = require('sequelize');
const { Character, Stats } = require('../../models');

router.put('/', async (req, res) => {
  try {
    const characterData = await Character.update({user_id:req.session.user_id}, {where:{id:req.body.id}});
    if(!characterData){
      res.status(400).json({ message: 'There was an error in picking your character' });
      return;
    }
    res.status(200).json(characterData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const characterData = await Character.findOne({where:{user_id:req.session.user_id}, include:[{model:Stats}]});
    if(!characterData){
      res.status(400).json({ message: 'There was an error in retrieving your character data' });
      return;
    }
    res.status(200).json(characterData);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;
const router = require('express').Router();
const { where } = require('sequelize');
const { Character, Stats } = require('../../models');

router.post('/', async (req, res) => {
  try {
    console.log('I Got Here G')
    const chosen = await Character.findByPk(req.body.id);
    if(!chosen){
      res.status(400).json({ message: 'There was an error in picking your character' });
      return;
    }
    const data = chosen.get({plain:true})
    console.log(data)

    const characterData = await Character.create({
      character_name: data.character_name,
      healthpoins: data.healthpoins,
      height: data.height,
      user_id: req.session.user_id,
      stats_id: data.stats_id,
      equipment_id: data.equipment_id
    });
    if(!characterData){
      res.status(400).json({ message: 'There was an error in picking your character' });
      return;
    }
    res.status(200).json(characterData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/', async(req, res)=> {
  try{
    const characterData = await Character.update({
      healthpoins:req.body.healthpoins,
    }, {where:{id:req.session.user_id}});
    if(!characterData){
      res.status(400).json({ message: 'There was an error in updating your character data' });
      return;
    }
    res.status(200).json(characterData)
  }catch (err) {
    res.status(500).json(err);
  }
})

router.get('/', async (req, res) => {
  try {
    const characterData = await Character.findOne({where:{user_id:req.session.user_id}}, {include:[{model:Stats}]});
    if(!characterData){
      res.status(400).json({ message: 'There was an error in retrieving your character data' });
      return;
    }
    res.status(200).json(characterData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/', async (req,res) => {
  try{
    const characterData = await Character.destroy({where:{ id:req.body.id }})
    if(!characterData){
      res.status(400).json({ message: 'There was an error in deleting your current character data' });
      return;
    }
     res.status(200).json(characterData)
  } catch(err){
    res.status(500).json(err);
  }
})

module.exports = router;
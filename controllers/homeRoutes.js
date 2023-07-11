const router = require('express').Router();
const { User, Character, Stats, Equipment, Story, Choice, StoryChoice} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    res.render('homepage');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/ending', withAuth, async (req, res) => {
  res.render('ending', { logged_in: req.session.logged_in})
})

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Character }],
    });

    const user = userData.get({ plain: true });
    console.log(user)
    res.render('dashboard', {
      ...user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/newStory', withAuth, async (req, res) =>{
  try{
    const characterData = await Character.findAll({where:{user_id:null}, include:[{model:Stats}]} );

    const characters = characterData.map((character) => character.get({ plain: true }));
    console.log(characters)
    res.render('newStory', {
      characters,
      logged_in: req.session.logged_in
    });
  } catch(err){
    res.status(500).json(err);
  }
})

router.get('/Goose',  withAuth, async (req, res) =>{
  try{
    const storyData = await Story.findByPk(8, {include:[{model:Choice, through:{attributes:['id','choice_id', 'next_id']}}]});
    const characterName = await Character.findOne({
      where:{user_id:req.session.user_id},
      attributes:['character_name']});
    
    if (!storyData || !characterName) {
      res
        .status(400)
        .json({ message: 'Next story sequence not found please try again later' });
      return;
    }

    const story = storyData.get({ plain: true });
    const name = characterName.get({ plain:true });
 
    res.render('template', {
      story,
      name,
      logged_in: req.session.logged_in
    });
  } catch(err){
    res.status(500).json(err);
  }
});

router.get('/adventure', withAuth, async (req, res) =>{
  try{
    const storyData = await Story.findByPk(1, {include:[{model:Choice, through:{attributes:['id','choice_id', 'next_id']}}]});
    const characterName = await Character.findOne({
      where:{user_id:req.session.user_id},
      attributes:['character_name']});
    
    if (!storyData || !characterName) {
      res
        .status(400)
        .json({ message: 'Next story sequence not found please try again later' });
      return;
    }

    const story = storyData.get({ plain: true });
    const name = characterName.get({ plain:true });
 
    res.render('template', {
      story,
      name,
      logged_in: req.session.logged_in
    });
  } catch(err){
    res.status(500).json(err);
  }
});

router.get('/adventure/:id', withAuth, async (req, res) =>{
  try{
    const storyData = await Story.findByPk(req.params.id, {include:[{model:Choice}]});
    const characterName = await Character.findOne({
      where:{user_id:req.session.user_id},
      attributes:['character_name']});
    if (!storyData || !characterName) {
      res
        .status(400)
        .json({ message: 'Next story sequence not found please try again later' });
      return;
    }

    const story = storyData.get({ plain: true });
    const name = characterName.get({ plain:true });
    console.log(name)
    res.render('template', {
      story,
      name,
      logged_in: req.session.logged_in,
      deepPath:true
    });
  } catch(err){
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  //let signUp = false;
  res.render('login', {signUp:false});
});

router.get('/signUp', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
  
    //let signUp = true;
    res.render('login', {signUp:true});
  });

module.exports = router;
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

router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          include:{model:User, attributes:['name']}
        }
      ],
    });

    const blog = blogData.get({ plain: true });

    console.log(blog.comments)

    res.render('blog', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Character }, { model: Story} ],
    });

    const user = userData.get({ plain: true });
    console.log(user)
    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/newStory', withAuth, async (req, res) =>{
  try{
    const characterData = await Character.findAll({include:[{model:Stats}]});

    const characters = characterData.map((character) => character.get({ plain: true }));
    //console.log(characters)
    res.render('newStory', {
      characters,
      logged_in: req.session.logged_in
    });
  } catch(err){
    res.status(500).json(err);
  }
})

router.get('/adventure', withAuth, async (req, res) =>{
  try{
    const storyData = await Story.findByPk(1, {include:[{model:Choice, through:{attributes:['id','choice_id', 'next_id']}}]});

    if (!storyData) {
      res
        .status(400)
        .json({ message: 'no starting adventure text' });
      return;
    }

    const story = storyData.get({ plain: true });
    /*try{
      const story = storyData.get({ plain: true });
    }catch{
      console.log('failed');
      return;
    }*/
    //console.log(story)
    res.render('template', {
      story,
      logged_in: req.session.logged_in
    });
  } catch(err){
    res.status(500).json(err);
  }
});

router.get('/adventure/:id', withAuth, async (req, res) =>{
  try{
    const storyData = await Story.findByPk(req.params.id, {include:[{model:Choice}]});

    if (!storyData) {
      res
        .status(400)
        .json({ message: 'Next story sequence not found please try again later' });
      return;
    }

    const story = storyData.get({ plain: true });
    //console.log(story)
    res.render('template', {
      story,
      logged_in: req.session.logged_in
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
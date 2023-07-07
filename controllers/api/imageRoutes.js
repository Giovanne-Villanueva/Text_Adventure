const router = require('express').Router();
const sharp = require('sharp');

const original = ['Buzy Bee.jpg', 'Grizzly Bear.jpg', 'Vent.jpg', 'Wheezy Goose.jpg'];
const newImage = ['bee.jpg', 'bear.jpg', 'vent.jpg', 'goose.jpg'];

router.get('/', async(req, res) =>{
  for(let i=0; i < original.length; i++){
    sharp(`./public/images/original_image/${original[i]}`)
      .resize(200, 200, {
        fit:"contain",
        background:{
          r:0,
          b:0,
          g:0
        }
      })
      .toFile(`./public/images/output/${newImage[i]}`)
  }
  res.status(200).json(newImage)
});


module.exports = router;
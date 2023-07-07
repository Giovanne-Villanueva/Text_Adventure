const router = require('express').Router();
const userRoutes = require('./userRoutes');
const characterRoutes = require('./characterRoutes');
const imageRoute = require('./imageRoutes')

router.use('/users', userRoutes);
router.use('/characters', characterRoutes);
router.use('/images', imageRoute)

module.exports = router;
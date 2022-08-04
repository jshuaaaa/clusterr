const router = require('express').Router();
const postRoutes = require('./postRoutes');
const userRoutes = require('./userRoutes');
const helper = require('./helper')

router.use("/posts", postRoutes);
router.use('/users', userRoutes);
router.use('/helper', helper);

module.exports = router;
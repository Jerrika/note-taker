const router = require('express').Router();
const apiRouter = require('./api-routes');
const htmlRouter = require('./html-routes');

router.use('/api-routes', apiRouter);
router.use('/html-routes', htmlRouter);

module.exports = router;
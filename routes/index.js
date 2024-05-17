const router = require('express').Router();

const deletionRouter = require('./deletion');
const creationRouter = require('./creation');
const readRouter = require('./read');
const updateRouter = require('./update');

router.use('/deletion', deletionRouter);
router.use('/creation', creationRouter);
router.use('/read', readRouter);
router.use('/update', updateRouter);

module.exports = router;
const router = require('express').Router();

// Import our modular router for /notes
const notesRouter = require('./apiRoutes');

router.use('/notes', notesRouter);

module.exports = router;

const express = require('express');
const router = express.Router();

// Import individual route modules
const usersRouter = require('./users');
const contactsRouter = require('./contacts');

// Mount them under their respective paths
router.use('/users', usersRouter);
router.use('/contacts', contactsRouter);

// Export the router
module.exports = router;

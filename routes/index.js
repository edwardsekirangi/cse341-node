const express = require('express');

const router = express.Router();

// GET /feed/posts
//router.get('/', (req, res) => {res.send('Hello from the professional route!');});
// localhost:8080/professional/

router.use('/', require('../routes/users'));
// localhost:8080/professional/users
module.exports = router;
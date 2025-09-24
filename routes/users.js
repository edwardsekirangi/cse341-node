const express = require('express');
const router = express.Router();

//users controller
const usersController = require('../controllers/users');
// example route

//creating 2 routes a get and a get all route
router.get('/all', usersController.getAllUsers); // GET /professional/users/all
router.get('/:id', usersController.getSingle); // GET /professional/users/:id
router.put('/:id', usersController.updateUser); // PUT /professional/users/
router.post('/', usersController.createUser); // POST /professional/users/
router.delete('/:id', usersController.deleteUser); // DELETE /professional/users/:id
//debug route
router.get('/', (req, res) => {
    res.send(
        'Hello from users!,Type /users/all to see all users and /users/:id to see a single user'
    );
});

module.exports = router; // ✅ export the router

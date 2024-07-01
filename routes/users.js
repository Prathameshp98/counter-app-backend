const express = require('express')

const userController = require('../controllers/users')

const router = express.Router();

router.get('/users', userController.getUsers);

router.get('/add-user-manually', userController.addOne);

module.exports = router;
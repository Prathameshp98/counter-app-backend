const express = require('express')

const userController = require('../controllers/users')

const router = express.Router();

router.get('/users', userController.getUsers);

router.get('/get-names', userController.getNames);

router.get('/add-user-manually', userController.addOne);

module.exports = router;
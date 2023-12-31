const express = require('express')

const counterController = require('../controllers/counters')

const router = express.Router()

// /auth/signup
router.post('/save-counters', counterController.saveCounters)

// /auth/login
router.get('/get-counters', counterController.getCounters)


module.exports = router
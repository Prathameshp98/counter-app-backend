
const Counter = require('../models/Counter')

exports.saveCounters = (req, res, next) => {

}

exports.getCounters = (req, res, next) => {

    Counter.find()
        .then(counters => {
            res.status(200).json({data: counters})
        })
        .catch((err) => {
            res.status(500).json({data: err})
        })
}
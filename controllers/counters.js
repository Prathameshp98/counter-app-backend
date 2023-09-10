
const Counter = require('../models/Counter')

exports.saveCounters = (req, res, next) => {

    const data = req.body.data

    Counter.deleteMany()
        .then(deleted => {
            Counter.insertMany(data)
                .then(result => {
                    res.status(201).json({data: result})
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
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
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const counterRoutes = require('./routes/counters')

dotenv.config()

const MONGODB_URI = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_CLUSTER}/${process.env.DATABASE_NAME}`

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use('/', counterRoutes)

mongoose.connect(
    MONGODB_URI + '?retryWrites=true&w=majority'
    )
    .then(result => {
        app.listen(process.env.PORT , () => {
            console.log("App started on port 8282")
        });   
    })
    .catch(err => console.log(err))
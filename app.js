const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const usersData = require('./utils/usersData');

const counterRoutes = require('./routes/counters')

dotenv.config()

const MONGODB_URI = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_CLUSTER}/${process.env.DATABASE_NAME}`

const app = express()

app.use(bodyParser.json());


const userSchema = new mongoose.Schema({
    data: Object
});
const User = mongoose.model('User', userSchema);


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use('/', counterRoutes)

app.get('/users', async (req, res) => {
    try {
        const items = await User.find();
        const dt = usersData(items[0].data.AuthorWorklog)
        items[0].data.AuthorWorklog.rows.push(dt);
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

mongoose.connect(
    MONGODB_URI + '?retryWrites=true&w=majority'
    )
    .then(result => {
        app.listen(process.env.PORT , () => {
            console.log("App started on port 8080")
        });   
    })
    .catch(err => console.log(err))
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    data: Object
});

module.exports = mongoose.model('User', userSchema);
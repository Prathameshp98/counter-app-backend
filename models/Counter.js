const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CounterSchema = new Schema({
    counterId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }

},
{timestamps: true}
)

module.exports = mongoose.model('Counter', CounterSchema)
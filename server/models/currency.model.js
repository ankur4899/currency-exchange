const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Currency = new Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        unique: true
    },
    rates: {},
    createdDate: {
        type: Date,
        default: Date.now()
    },
    updatedDate: {
        type: Date,
        default: Date.now()
    }
}, {
    collection: 'currencies'
})

module.exports = mongoose.model('currencies', Currency)
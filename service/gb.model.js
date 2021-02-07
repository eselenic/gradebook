const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Gradebook = new Schema({
    gb_class: {
        type: String
    },
    gb_t1: {
        type: String
    },
    gb_t2: {
        type: String
    },
    gb_t3: {
        type: String
    },
    gb_t4: {
        type: String
    }
});

module.exports = mongoose.model('Gradebook', Gradebook);
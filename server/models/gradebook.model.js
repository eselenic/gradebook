const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Gradebook = new Schema({
    year: {
        type: int
    },
    grades: {
        type: [Schema.Types.ObjectId]
    }
});

module.exports = mongoose.model('Gradebook', Gradebook);
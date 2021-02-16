const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Assignment = new Schema({
    semester: {
        type: Number
    },
    type: {
        type: String
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('Assignment', Assignment);
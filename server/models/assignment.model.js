const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Assignment = new Schema({
    semester: {
        type: int
    },
    type: {
        type: String
    },
    description: {
        type: String
    },
    grade: {
        type: double
    }
});

module.exports = mongoose.model('Assignment', Assignment);
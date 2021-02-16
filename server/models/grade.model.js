const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Grade = new Schema({
    assignment: {
        type: Schema.Types.ObjectId
    },
    overall_grade: {
        type: Number
    }
});

module.exports = mongoose.model('Grade', Grade);
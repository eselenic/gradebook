const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Student = new Schema({
    student_id: {
        type: ObjectId
    }
});

module.exports = mongoose.model('Student', Student);
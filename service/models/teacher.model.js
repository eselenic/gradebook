const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Teacher = new Schema({
    teacher_id: {
        type: ObjectId
    },
    classes: {
        type: [ObjectId]
    }
});

module.exports = mongoose.model('Teacher', Teacher);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Teacher = new Schema({
    teacher_name: {
        type: String
    },
    classes: {
        type: [Schema.Types.ObjectId]
    }
});

module.exports = mongoose.model('Teacher', Teacher);
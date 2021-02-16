const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Teacher = new Schema({
    school_id:{
        type: Number
    },
    teacher_name: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    activities: {
        type: [String]
    },
    disciplines: {
        type: [String]
    },
    current_classes: {
        type: [Schema.Types.ObjectId]
    }
});

module.exports = mongoose.model('Teacher', Teacher);
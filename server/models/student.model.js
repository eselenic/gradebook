const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Student = new Schema({
    school_id:{
        type: Number
    },
    student_name: {
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
    gradebook: {
        type: [Schema.Types.ObjectId]
    }
});

module.exports = mongoose.model('Student', Student);
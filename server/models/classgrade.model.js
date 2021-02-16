const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ClassGrade = new Schema({
    school_id: {
        type: Number
    },
    student_id:{
        type: Schema.Types.ObjectId
    },
    class_id: {
        type: Schema.Types.ObjectId
    },
    assignments: {
        type: [Schema.Types.ObjectId]
    },
    overall_grade: {
        type: Number
    }
});

module.exports = mongoose.model('ClassGrade', ClassGrade);
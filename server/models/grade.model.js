const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Grade = new Schema({
    school_id: {
        type: int
    },
    class_id: {
        type: Schema.Types.ObjectId
    },
    assignments: {
        type: [Schema.Types.ObjectId]
    },
    overall_grade: {
        type: double
    }
});

module.exports = mongoose.model('Grade', Grade);
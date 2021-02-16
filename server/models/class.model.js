const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Class = new Schema({
    school_id: {
        type: Number
    },
    classname: {
        type: String
    },
    teachers: {
        type: [Schema.Types.ObjectId]
    },
    students: {
        type: [Schema.Types.ObjectId]
    }
});

module.exports = mongoose.model('Class', Class);
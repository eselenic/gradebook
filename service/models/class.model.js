const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Class = new Schema({
    class_id: {
        type: ObjectId
    },
    classname: {
        type: String
    },
    teachers: {
        type: String
    },
    students: {
        type: [ObjectId]
    }
});

module.exports = mongoose.model('Class', Class);
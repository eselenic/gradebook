const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Class = new Schema({
    class_id: {
        type: Schema.Types.ObjectId
    },
    classname: {
        type: String
    },
    teachers: {
        type: String
    },
    students: {
        type: [Schema.Types.ObjectId]
    }
});

module.exports = mongoose.model('Class', Class);
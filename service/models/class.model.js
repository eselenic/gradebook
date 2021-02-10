const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Class = new Schema({
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
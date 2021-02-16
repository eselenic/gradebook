const mongoose = require('mongoose');

let Teacher = require('../models/teacher.model');
let Student = require('../models/student.model');
let Classes = require('../models/class.model');

var students = [{ school_id: 1, student_name: 'Medusa', username: 'medusa', password: '1234', activities: [], disciplines: [], gradebook: []},
{ school_id: 1, student_name: 'Vesta', username: 'vesta', password: 'abcd', activities: [], disciplines: [], gradebook: []},
{ school_id: 1, student_name: 'Jupiter', username: 'jupiter', password: '0000', activities: [], disciplines: [], gradebook: []},
{ school_id: 1, student_name: 'Minerva', username: 'minerva', password: '9090', activities: [], disciplines: [], gradebook: []}
];

var teachers = [{ school_id: 1, teacher_name: 'Zeus', username: 'zeus', password: 'num1', activities: [], disciplines: [], current_classes: []},
{ school_id: 1, teacher_name: 'Hera', username: 'hera', password: 'num2', activities: [], disciplines: [], current_classes: []},
{ school_id: 1, teacher_name: 'Athena', username: 'athena', password: 'num3', activities: [], disciplines: [], current_classes: []},
{ school_id: 1, teacher_name: 'Aphrodite', username: 'love', password: 'love', activities: [], disciplines: [], current_classes: []}
];
var studentIds = [];
var teacherIds = [];

function populateStudents(){
  return new Promise(function(resolve, reject){
    Student.insertMany(students, function (err, docs){
      if(err){
        console.error(err);
      } else {
        docs.forEach((document) => { studentIds.push(document._id)});
        console.log("Students insterted to collection");
        resolve();
      }
    });
  });
}

function populateTeachers(){
  return new Promise(function(resolve, reject){
    Teacher.insertMany(teachers, function (err, docs){
      if(err){
        console.error(err);
      } else {
        docs.forEach((document) => { teacherIds.push(document._id)});
        console.log("Teachers insterted to collection");
        resolve();
      }
  })});
}

function populateClasses(){
  return new Promise(function(resolve, reject) {
    var classes = [{ school_id: 1, classname: 'P.E',
    teachers: [teacherIds[0]],
    students: [studentIds[0], studentIds[1]] },
      { school_id: 1, classname: 'Chemistry',
      teachers: [teacherIds[1]],
      students: [studentIds[0], studentIds[2]] },
      { school_id: 1, classname: 'Calculus',
      teachers: [teacherIds[2]],
      students: [studentIds[3], studentIds[1]] },
        { school_id: 1, classname: 'English',
        teachers: [teacherIds[3]],
        students:  [studentIds[3], studentIds[2]] }
    ];

    Classes.insertMany(classes, function (err, docs){
    if(err){
    console.error(err);
    } else {
    console.log("Classes insterted to collection");
    resolve();
    }
    });
  });
}

function populateData() {
  mongoose.connect('mongodb://127.0.0.1:27017/gb', { useNewUrlParser: true });
  const connection = mongoose.connection;

  connection.once('open', function() {
      console.log("MongoDB database connection established successfully");
      Student.collection.drop();
      Teacher.collection.drop();
      Classes.collection.drop();

      populateStudents().then(populateTeachers).then(populateClasses);

  });
}
module.exports.populateData = populateData;
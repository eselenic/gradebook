const mongoose = require('mongoose');

let Teacher = require('../models/teacher.model');
let Student = require('../models/student.model');
let Classes = require('../models/class.model');

var students = [{ student_name: 'Medusa'},
{ student_name: 'Vetsa'},
{ student_name: 'Jupiter'},
{ student_name: 'Minerva'}
];

var teachers = [{ teacher_name: 'Zeus', classes: []},
{ teacher_name: 'Hera', classes: []},
{ teacher_name: 'Athena', classes: []},
{ teacher_name: 'Aphrodite', classes: []}
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
    var classes = [{ classname: 'P.E',
    teachers: [teacherIds[0]],
    students: [studentIds[0], studentIds[1]] },
      { classname: 'Chemistry',
      teachers: [teacherIds[1]],
      students: [studentIds[0], studentIds[2]] },
      { classname: 'Calculus',
      teachers: [teacherIds[2]],
      students: [studentIds[3], studentIds[1]] },
        { classname: 'English',
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
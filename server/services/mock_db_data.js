const mongoose = require('mongoose');

let Teacher = require('../models/teacher.model');
let Student = require('../models/student.model');
let Classes = require('../models/class.model');
let Assignment = require('../models/assignment.model');
let Grade = require('../models/grade.model');
let ClassGrade = require('../models/classgrade.model');
let Gradebook = require('../models/gradebook.model');

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

var assignments = [{ semester: 1, type: "Homework", description: "Conversions"},
{ semester: 1, type: "Homework", description: "Mile Run"},
{ semester: 1, type: "Homework", description: "Reading"},
{ semester: 1, type: "Homework", description: "Chain Rule"}];

var studentIds = [];
var teacherIds = [];
var assignmentIds = [];
var classIds = [];
var gradeIds = [];
var classGradeIds = [];

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

function populateAssignments(){
  return new Promise(function(resolve, reject){
    Assignment.insertMany(assignments, function (err, docs){
      if(err){
        console.error(err);
      } else {
        docs.forEach((document) => { assignmentIds.push(document._id)});
        console.log("Assignments inserted to collection");
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
    docs.forEach((document) => { classIds.push(document._id)});
    console.log("Classes insterted to collection");
    resolve();
    }
    });
  });
}

function populateGrades(){
  return new Promise(function(resolve, reject) {
    var grades = [{ assignment: assignmentIds[1], overall_grade: 90 },
    { assignment: assignmentIds[0], overall_grade: 90 },
    { assignment: assignmentIds[1], overall_grade: 80 },
    { assignment: assignmentIds[3], overall_grade: 98 },
    { assignment: assignmentIds[0], overall_grade: 45 },
    { assignment: assignmentIds[2], overall_grade: 75 },
    { assignment: assignmentIds[3], overall_grade: 60 },
    { assignment: assignmentIds[2], overall_grade: 100 }
    ];

    Grade.insertMany(grades, function (err, docs){
    if(err){
    console.error(err);
    } else {
    docs.forEach((document) => { gradeIds.push(document._id)});
    console.log("Grades inserted to collection");
    resolve();
    }
    });
  });
}

function populateClassGrades(){
  return new Promise(function(resolve, reject) {
    var classGrades = [{ school_id: 1,
       student_id: studentIds[0], class_id: classIds[0],
       assignments:[gradeIds[0]], overall_grade: 90},
       { school_id: 1,
        student_id: studentIds[0], class_id: classIds[1],
        assignments:[gradeIds[1]], overall_grade: 90},
        { school_id: 1,
          student_id: studentIds[1], class_id: classIds[0],
          assignments:[gradeIds[2]], overall_grade: 80},
          { school_id: 1,
            student_id: studentIds[1], class_id: classIds[2],
            assignments:[gradeIds[3]], overall_grade: 98},
            { school_id: 1,
              student_id: studentIds[2], class_id: classIds[1],
              assignments:[gradeIds[4]], overall_grade: 45},
              { school_id: 1,
                student_id: studentIds[2], class_id: classIds[3],
                assignments:[gradeIds[5]], overall_grade: 75},
                { school_id: 1,
                  student_id: studentIds[3], class_id: classIds[2],
                  assignments:[gradeIds[6]], overall_grade: 60},
                  { school_id: 1,
                    student_id: studentIds[3], class_id: classIds[3],
                    assignments:[gradeIds[7]], overall_grade: 100}
    ];

    ClassGrade.insertMany(classGrades, function (err, docs){
    if(err){
    console.error(err);
    } else {
    docs.forEach((document) => { classGradeIds.push(document._id)});
    console.log("Class Grades inserted to collection");
    resolve();
    }
    });
  });
}

function populateGradebook(){
  return new Promise(function(resolve, reject) {
    var gradebook = [{ year: 2020, student_id: studentIds[0], grades: [gradeIds[0], gradeIds[1]]},
    { year: 2020, student_id: studentIds[1], grades: [gradeIds[2], gradeIds[3]]},
    { year: 2020, student_id: studentIds[2], grades: [gradeIds[4], gradeIds[5]]},
    { year: 2020, student_id: studentIds[3], grades: [gradeIds[6], gradeIds[7]]}
    ];

    Gradebook.insertMany(gradebook, function (err, docs){
    if(err){
    console.error(err);
    } else {
    console.log("Gradebook inserted to collection");
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
      Assignment.collection.drop();
      Grade.collection.drop();
      ClassGrade.collection.drop();
      Gradebook.collection.drop();

      populateStudents()
          .then(populateTeachers)
          .then(populateClasses)
          .then(populateAssignments)
          .then(populateGrades)
          .then(populateClassGrades)
          .then(populateGradebook);

  });
}
module.exports.populateData = populateData;
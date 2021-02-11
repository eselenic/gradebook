const studentRoutes = require('express').Router();

let Student = require('../models/student.model');

studentRoutes.route('/').get(function(req, res) {
    Student.find(function(err, student) {
        if (err) {
            console.log(err);
        } else {
            res.json(student);
        }
    });
});

studentRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Student.findById(id, function(err, todo) {
        res.json(todo);
    });
});

studentRoutes.route('/add').post(function(req, res) {
    let student = new Student(req.body);
    student.save()
        .then(student => {
            res.status(200).json({'student': 'student added successfully'});
        })
        .catch(student => {
            res.status(400).send('adding new student failed');
        });
});

studentRoutes.route('/update/:id').post(function(req, res) {
    Student.findById(req.params.id, function(err, student) {
        if (!student)
            res.status(404).send("data is not found");
        else
            student.school_id = req.body.school_id;
            student.student_name = req.body.student_name;
            student.username = req.body.username;
            student.password = req.body.password;
            student.activities = req.body.activities;
            student.disciplines = req.body.disciplines;
            student.gradebook = req.body.gradebook;

            student.save().then(student => {
                res.json('Student updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

module.exports = studentRoutes;
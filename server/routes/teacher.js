const teacherRoutes = require('express').Router();

let Teacher = require('../models/teacher.model');

teacherRoutes.route('/').get(function(req, res) {
    Teacher.find(function(err, teacher) {
        if (err) {
            console.log(err);
        } else {
            res.json(teacher);
        }
    });
});

teacherRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Teacher.findById(id, function(err, todo) {
        res.json(todo);
    });
});

teacherRoutes.route('/add').post(function(req, res) {
    let teacher = new Teacher(req.body);
    teacher.save()
        .then(teacher => {
            res.status(200).json({'teacher': 'teacher added successfully'});
        })
        .catch(teacher => {
            res.status(400).send('adding new teacher failed');
        });
});

teacherRoutes.route('/update/:id').post(function(req, res) {
    Teacher.findById(req.params.id, function(err, teacher) {
        if (!teacher)
            res.status(404).send("data is not found");
        else
            teacher.school_id = req.body.school_id;
            teacher.teacher_name = req.body.teacher_name;
            teacher.username = req.body.username;
            teacher.password = req.body.password;
            teacher.activities = req.body.activities;
            teacher.disciplines = req.body.disciplines;
            teacher.current_classes = req.body.current_classes;

            teacher.save().then(teacher => {
                res.json('Teacher updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

module.exports = teacherRoutes;
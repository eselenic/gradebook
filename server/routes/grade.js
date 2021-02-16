const gradeRoutes = require('express').Router();

let Grade = require('../models/class.model');

gradeRoutes.route('/').get(function(req, res) {
    Grade.find(function(err, grade) {
        if (err) {
            console.log(err);
        } else {
            res.json(grade);
        }
    });
});

gradeRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    ClassGrade.findById(id, function(err, todo) {
        res.json(todo);
    });
});

gradeRoutes.route('/add').post(function(req, res) {
    let grade = new Grade(req.body);
    grade.save()
        .then(grade => {
            res.status(200).json({'grade': 'grade added successfully'});
        })
        .catch(grade => {
            res.status(400).send('adding new grade failed');
        });
});

gradeRoutes.route('/update/:id').post(function(req, res) {
    Grade.findById(req.params.id, function(err, grade) {
        if (!grade)
            res.status(404).send("data is not found");
        else
            grade.assignment = req.body.assignment;
            grade.overall_grade = req.body.overall_grade;

            grade.save().then(grade => {
                res.json('Grade updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

module.exports = classGradeRoutes;
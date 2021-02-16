const classGradeRoutes = require('express').Router();

let ClassGrade = require('../models/classgrade.model');

classGradeRoutes.route('/').get(function(req, res) {
    ClassGrade.find(function(err, classGrade) {
        if (err) {
            console.log(err);
        } else {
            res.json(classGrade);
        }
    });
});

classGradeRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    ClassGrade.findById(id, function(err, todo) {
        res.json(todo);
    });
});

classGradeRoutes.route('/add').post(function(req, res) {
    let classGrade = new ClassGrade(req.body);
    classGrade.save()
        .then(classGrade => {
            res.status(200).json({'classGrade': 'classGrade added successfully'});
        })
        .catch(classGrade => {
            res.status(400).send('adding new classGrade failed');
        });
});

classGradeRoutes.route('/update/:id').post(function(req, res) {
    ClassGrade.findById(req.params.id, function(err, classGrade) {
        if (!classGrade)
            res.status(404).send("data is not found");
        else
            classGrade.school_id = req.body.school_id;
            classGrade.class_id = req.body.class_id;
            classGrade.student_id = req.body.student_id;
            classGrade.assignments = req.body.assignments;
            classGrade.overall_classGrade = req.body.overall_classGrade;

            classGrade.save().then(classGrade => {
                res.json('ClassGrade updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

module.exports = classGradeRoutes;
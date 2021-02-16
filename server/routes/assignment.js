const assignmentRoutes = require('express').Router();

let Assignment = require('../models/assignment.model');

assignmentRoutes.route('/').get(function(req, res) {
    Assignment.find(function(err, assignment) {
        if (err) {
            console.log(err);
        } else {
            res.json(assignment);
        }
    });
});

assignmentRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Assignment.findById(id, function(err, todo) {
        res.json(todo);
    });
});

assignmentRoutes.route('/add').post(function(req, res) {
    let assignment = new Assignment(req.body);
    assignment.save()
        .then(assignment => {
            res.status(200).json({'assignment': 'assignment added successfully'});
        })
        .catch(assignment => {
            res.status(400).send('adding new assignment failed');
        });
});

assignmentRoutes.route('/update/:id').post(function(req, res) {
    Assignment.findById(req.params.id, function(err, assignment) {
        if (!assignment)
            res.status(404).send("data is not found");
        else
            assignment.semester = req.body.semester;
            assignment.type = req.body.type;
            assignment.description = req.body.description;
            assignment.grade = req.body.grade;

            assignment.save().then(assignment => {
                res.json('Assignment updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

module.exports = assignmentRoutes;
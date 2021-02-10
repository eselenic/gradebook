const classesRoutes = require('express').Router();

let Classes = require('../models/class.model');

classesRoutes.route('/').get(function(req, res) {
    Classes.find(function(err, classes) {
        if (err) {
            console.log(err);
        } else {
            res.json(classes);
        }
    });
});

classesRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Classes.findById(id, function(err, todo) {
        res.json(todo);
    });
});

classesRoutes.route('/add').post(function(req, res) {
    let classes = new Classes(req.body);
    classes.save()
        .then(classes => {
            res.status(200).json({'classes': 'classes added successfully'});
        })
        .catch(classes => {
            res.status(400).send('adding new classes failed');
        });
});

classesRoutes.route('/update/:id').post(function(req, res) {
    Classes.findById(req.params.id, function(err, classes) {
        if (!classes)
            res.status(404).send("data is not found");
        else
        classes.classes_id = req.body.class_id;
        classes.classname = req.body.classname;
        classes.teachers = req.body.teachers;
        classes.students = req.body.students;

        classes.save().then(classes => {
                res.json('Classes updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

module.exports = classesRoutes;
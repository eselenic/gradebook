const gradebookRoutes = require('express').Router();

let Gradebook = require('../models/gradebook.model');

gradebookRoutes.route('/').get(function(req, res) {
    Gradebook.find(function(err, gradebook) {
        if (err) {
            console.log(err);
        } else {
            res.json(gradebook);
        }
    });
});

gradebookRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Gradebook.findById(id, function(err, todo) {
        res.json(todo);
    });
});

gradebookRoutes.route('/add').post(function(req, res) {
    let grade = new Gradebook(req.body);
    grade.save()
        .then(grade => {
            res.status(200).json({'gradebook': 'gradebook added successfully'});
        })
        .catch(grade => {
            res.status(400).send('adding new gradebook failed');
        });
});

gradebookRoutes.route('/update/:id').post(function(req, res) {
    Gradebook.findById(req.params.id, function(err, gb) {
        if (!gb)
            res.status(404).send("data is not found");
        else
            gb.year = req.body.year;
            gb.grades = req.body.grades;

            gb.save().then(gb => {
                res.json('Gradebook updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

module.exports = gradebookRoutes;
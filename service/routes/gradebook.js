/* TODO: Update gradebookRoutes after TODO from gb.model.js is completed*/
const gradebookRoutes = require('express').Router();

let Gradebook = require('../models/gb.model');

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
            gb.gb_class = req.body.gb_class;
            gb.gb_t1 = req.body.gb_t1;
            gb.gb_t2 = req.body.gb_t2;
            gb.gb_t3 = req.body.gb_t3;
            gb.gb_t4 = req.body.gb_t4;

            gb.save().then(gb => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

module.exports = gradebookRoutes;
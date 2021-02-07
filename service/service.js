const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const gradebookRoutes = express.Router();
const PORT = 4000;

let Gradebook = require('./gb.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/gb', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

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

app.use('/gradebook', gradebookRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});


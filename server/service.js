const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;
const MockData = require('./services/mock_db_data');

app.use(cors());
app.use(bodyParser.json());

app.use('/gradebook', require('./routes/gradebook'));
app.use('/class', require('./routes/class'));
app.use('/teacher', require('./routes/teacher'));
app.use('/student', require('./routes/student'));

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
    MockData.populateData();
});


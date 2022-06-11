const express = require('express');
const app = express();
const allTasks = require('./routes/tasks.routes');

const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.json());

app.use('/tasks', allTasks)


app.listen(4000)
console.log('Running on port 4000')
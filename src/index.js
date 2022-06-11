const express = require('express');
const app = express();
const allTasks = require('./routes/tasks.routes');
const cors = require('cors')

const morgan = require('morgan');

app.use(cors()); 
app.use(morgan('dev'));
app.use(express.json());

app.use('/tasks', allTasks)

// middleware to handle server errors
app.use((err, req, res, next) => {
    return res.json({ msg: err.message})
})


app.listen(4000)
console.log('Running on port 4000')
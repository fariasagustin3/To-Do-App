const pool = require('../db');


const getAllTasks = async (req, res) => {
    res.send('Retrieving all tasks')
}

const getTask = async (req, res) => {
    res.send('Retrieving a single task')
}

const postTask = async (req, res) => {
    const { title, description } = req.body;
    try {
        const result = await pool.query('INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *', [
            title,
            description
        ])
        res.status(200).json(result.rows[0])
    } catch(error) {
        res.status(404).send(error.message)
    }
}

const deleteTask = async (req, res) => {
    res.send('Deleting a task')
}

const updateTask = (req, res) => {
    res.send('Updating a task')
}

module.exports = {
    getAllTasks,
    getTask,
    postTask,
    deleteTask,
    updateTask
}
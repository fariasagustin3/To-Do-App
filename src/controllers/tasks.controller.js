const pool = require('../db');


const getAllTasks = async (req, res, next) => {
    try {
        const allTasks = await pool.query('SELECT * FROM task')
        res.status(200).send(allTasks.rows);
    } catch(error) {
        next(error)
    }
}

const getTask = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM task WHERE id = $1', [id])
        if(result.rows.length === 0) {
            return res.status(404).send('Task not found');
        }
        res.status(200).send(result.rows[0]);
    } catch(error) {
        next(error)
    }
}

const postTask = async (req, res, next) => {
    const { title, description } = req.body;
    try {
        const result = await pool.query('INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *', [
            title,
            description
        ])
        res.status(200).json(result.rows[0])
    } catch(error) {
        next(error)
    }
}

const deleteTask = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM task WHERE id = $1', [id])
        if(result.rowCount === 0) return res.status(404).send('Task not found')
        res.status(200).send('Task deleted')
    } catch(error) {
        next(error)
    }
}

const updateTask = async (req, res, next) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const result = await pool.query('UPDATE task SET title = $1, description = $2 WHERE id = $3', [title, description, id])
        if(result.rowCount === 0) return res.status(404).send('Task not found')
        res.status(200).send('Task updated')
    } catch(error) {
        next(error)
    }
}

module.exports = {
    getAllTasks,
    getTask,
    postTask,
    deleteTask,
    updateTask
}
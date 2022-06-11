const { Router } = require('express');
const { getAllTasks, getTask, postTask, deleteTask, updateTask } = require('../controllers/tasks.controller');

const router = Router();

router.get('/', getAllTasks);

router.get('/:id', getTask);

router.post('/', postTask);

router.delete('/', deleteTask);

router.put('/', updateTask);

module.exports = router;
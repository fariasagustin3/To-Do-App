import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Tasks.css';
import Task from './Task';
import axios from 'axios';


function Tasks() {

  const navigate = useNavigate();

  const [tasks, setTasks] = useState([])

  const loadTask = async () => {
    const res = await axios.get(`https://app-tasky.herokuapp.com/tasks`)
    const json = await res.data
    setTasks(json)
  }

  useEffect(() => {
    loadTask()
  }, [])

  const handleDelete = async (id) => {
    const res = await axios.delete(`https://app-tasky.herokuapp.com/tasks/${id}`)
    setTasks(tasks.filter((task) => task.id !== id))
  }


  return(
    <>
      <h1 className='task-list-title'>Task List</h1>
      {tasks.map((task) => (
        <Task 
          key={task.id}
          task={task}
          handleDelete={handleDelete}
          navigate={navigate}
        />
      ))}
    </>
  )
}

export default Tasks;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Tasks.css';
import Task from './Task';


function Tasks() {

  const navigate = useNavigate();

  const [tasks, setTasks] = useState([])

  const loadTask = async () => {
    const res = await fetch(`http://localhost:4000/tasks`)
    const data = await res.json()
    setTasks(data)
  }

  useEffect(() => {
    loadTask()
  }, [])

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:4000/tasks/${id}`, { method: 'DELETE' })
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
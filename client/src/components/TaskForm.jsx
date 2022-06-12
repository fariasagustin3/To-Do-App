import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import './styles/TaskForm.css';


function TaskForm() {

  const navigate = useNavigate()
  const params = useParams();

  const [input, setInput] = useState({
    title: '',
    description: ''
  })

  const [editing, setEditing] = useState(false)

  const loadTask = async (id) => {
    const res = await fetch(`http://localhost:4000/tasks/${id}`)
    const data = await res.json()
    setInput({ title: data.title, description: data.description })
    setEditing(true)
  }

  useEffect(() => {
    if(params.id) {
      loadTask(params.id)
    }
  }, [params])

  const handleInputChange = (e) => {
    setInput({...input, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(editing === true) {
      const response = await fetch(`http://localhost:4000/tasks/${params.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(input)
      })
      navigate('/')

    } else {
      await fetch(`http://localhost:4000/tasks`, { 
        method: 'POST',
        body: JSON.stringify(input),
        headers: { 'Content-Type': 'application/json'}
      })
      navigate('/')  
    }

  }

  return(
    <form className='form-container' onSubmit={(e) => handleSubmit(e)}>
      <h3 className='form-title'>{editing ? "Edit Task" : "Create Task"}</h3>
        <input className='input-title-form' type='text' name='title' value={input.title} placeholder='Insert a task title' onChange={(e) => handleInputChange(e)} />
        <input className='text-area-form' type='text' name='description' value={input.description} placeholder='Insert a short description' onChange={(e) => handleInputChange(e)} />
        <button className='submit-form' type='submit' >Save</button>
    </form>
  )
}

export default TaskForm;
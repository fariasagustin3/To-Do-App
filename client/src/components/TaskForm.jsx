import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import './styles/TaskForm.css';
import axios from 'axios';


function TaskForm() {

  const navigate = useNavigate()
  const params = useParams();

  const [input, setInput] = useState({
    title: '',
    description: ''
  })

  const [editing, setEditing] = useState(false)

  const loadTask = async (id) => {
    const res = await axios.get(`https://app-tasky.herokuapp.com/tasks/${id}`)
    const json = await res.data
    setInput({ title: json.title, description: json.description })
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
      const response = await axios.put(`https://app-tasky.herokuapp.com/tasks/${params.id}`, {
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(input)
      })
      navigate('/')

    } else {
      await axios.post(`https://app-tasky.herokuapp.com/tasks`, {
        body: JSON.stringify(input),
        headers: { 'Content-Type': 'application/json'}
      })
      navigate('/')  
    }

  }

  return(
    <form className='form-container' onSubmit={(e) => handleSubmit(e)}>
      <h3 className='form-title'> Taks Form </h3>
        <input className='input-title-form' type='text' name='title' value={input.title} placeholder='Insert a task title' onChange={(e) => handleInputChange(e)} />
        <input className='text-area-form' type='text' name='description' value={input.description} placeholder='Insert a short description' onChange={(e) => handleInputChange(e)} />
        <button className='submit-form' type='submit' >Save</button>
    </form>
  )
}

export default TaskForm;
import React from 'react';
import './styles/Task.css';

function Task({ task, handleDelete, navigate }) {
  return(
    <div className='container'>
      <div className='data-container'>
      <input className='checkbox' type='checkbox' />
      <h4 className='task-list-element-title'>{task.title}</h4>
      <p className='task-list-element-description'>{task.description}</p>
      </div>
      <div className='btn-container'>
        <button className='task-list-btn-edit' onClick={() => navigate(`/tasks/${task.id}/edit`)}>Edit</button>
        <button className='task-list-btn-delete' onClick={() => handleDelete(task.id)}>Delete</button>
      </div>
    </div>
  )
}

export default Task;
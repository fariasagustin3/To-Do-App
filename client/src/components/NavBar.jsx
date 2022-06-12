import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/NavBar.css'

export default function NavBar() {

  const navigate = useNavigate()

  return(
    <nav className='nav-container'>
      <h3 className='title-nav-bar'>Task List PERN</h3>
      <Link to='/'>
        <button className='nav-bar-btn'>Home</button>
      </Link>
      <Link to='/task/new'>
        <button className='nav-bar-btn' onClick={() => navigate('/task/new')}>Create Task</button>
      </Link>
    </nav>
  )
}
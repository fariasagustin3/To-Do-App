import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskForm from './components/TaskForm';
import Tasks from './components/Tasks';
import NavBar from './components/NavBar';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path='/' element={<Tasks />} />
          <Route path='/task/new' element={<TaskForm />} />
          <Route path='/tasks/:id/edit' element={<TaskForm />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;

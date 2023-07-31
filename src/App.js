import React,{useContext} from 'react';
import { Routes, Route } from 'react-router-dom';
import About from './components/About';
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import NoteState from './context/noteContext/noteState';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import AlertContext from './context/Alertcontext/alertContext'; 

function App() {
  const { alert } = useContext(AlertContext); 

  return (
    <div className="App">
      <NoteState>
          <Navbar />
          <Alert alert={alert} />
          <div className="container my-3 text-left">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
            </Routes>
          </div>
      </NoteState>
    </div>
  );
}

export default App;

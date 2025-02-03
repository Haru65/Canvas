import React from 'react';
import Login from './signup/login';
import Signup from './login/signup';
import Home from './home/Home';
import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from 'react-router-dom';
const App = () => {
  return (<BrowserRouter>
  <Routes>

    
    <Route path="/" element={<Login/>}></Route>

      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/home' element={<Home/>}></Route>

     
  </Routes>
  </BrowserRouter>
  );
}

export default App;

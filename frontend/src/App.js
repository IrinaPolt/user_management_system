import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/login/Login';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/dashboard/" element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

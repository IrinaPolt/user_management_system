import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import RegisterForm from './components/forms/RegisterForm';
import SignInForm from './components/forms/SignInForm';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <div className="image">
          <img src="path/to/image.jpg" alt="Image" />
        </div>
        <div className="forms">
          <RegisterForm />
          <SignInForm />
        </div>
      </div>
      <Routes>
        <Route path="/dashboard/" element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

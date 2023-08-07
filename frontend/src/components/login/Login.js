import React from 'react';
import RegisterForm from '../forms/RegisterForm';
import SignInForm from '../forms/SignInForm';
import './login.css';

const Login = () => {
  return (
    <div className="container">
      <div className="description">
        <p> A user management web application with frontend and backend components. The project adheres to industry best practices for security, performance, and code organization. It employs a range of technologies to deliver a reliable and efficient user experience.</p>
      </div>
      <div className="forms">
        <RegisterForm />
        <SignInForm />
      </div>
    </div>
  );
};

export default Login;

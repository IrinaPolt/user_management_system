import React from 'react';
import RegisterForm from '../forms/RegisterForm';
import SignInForm from '../forms/SignInForm';

const Login = () => {
  return (
    <div className="container">
      <div className="image">
        <img src="path/to/image.jpg" alt="Image" />
      </div>
      <div className="forms">
        <RegisterForm />
        <SignInForm />
      </div>
    </div>
  );
};

export default Login;

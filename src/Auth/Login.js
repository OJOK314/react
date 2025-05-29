import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const dummyUser = {
  email: 'admin@example.com',
  password: '1234',
};

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.email === dummyUser.email &&
      formData.password === dummyUser.password
    ) 
    
    {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/home');

       setFormData({
      email: '',
      password: '',
    });

    } else {
      alert('invalid credentials');
    }

   
  };

  return (
    <div className='login-container'>
      <form className='form-container' onSubmit={handleSubmit}>
        <h2 className='title'>Login</h2>

        <label className='heading' htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          name='email'
          required
          className='text-input'
          value={formData.email}
          onChange={handleChange}
        />

        <label className='heading' htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          name='password'
          required
          className='text-input'
          value={formData.password}
          onChange={handleChange}
        />

        <div className='button-1'>
          <button className='text-container' type='submit'>
            Login
          </button>
        </div>

        <p className='heading'>
          Don't have an account?{' '}
          <a href='./Signup' className='head'>SignUp</a>
        </p>
      </form>
    </div>
  );
}

export default Login;

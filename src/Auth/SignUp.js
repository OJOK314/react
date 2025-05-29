import React, { useState } from 'react';
import "./Login.css";



function SignUp() {
  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password:"",
    conformpassword:"",
    checkBox:"",
  })

  const handlechange=(e)=>{
  const {value, name} = e.target;

  setFormData((prevData) => ({
    ...prevData,
    [name]: value
  }))
}

const handleSubmit = () => {
  console.log("form data sumbmitted to the database", formData);
  alert("Signup successfully");
  setFormData({
    name: "",
    email: "",
    password: "",
    conformpassword:"",
    checkBox:"",
    
  });
}

  return (
    <div className='login-container'>
      <form className='form-container'>
        <h2 className='title'>Sign Up</h2>
         <label htmlFor='name' className='heading'>Name</label>
        <input type='text' id='name' name='name' value={formData.name} className='text-input' onChange={handlechange}/>

        <label htmlFor='email'  className='heading'>Email</label>
        <input type='email' id='email' name='email' className='text-input' required value={formData.email} onChange={handlechange}/>

        <label htmlFor='password'  className='heading'>Password</label>
        <input type='password' id='password' name='password' className='text-input' required value={formData.password} onChange={handlechange}/>

       <label htmlFor='conformPassword' className='heading'>Conform Password</label>
       <input  type='Password' id='conformpassword' name='conformpassword' className='text-input' value={formData.password} onChange={handlechange}/>
      
      <div>
        <div className='button-1'>
          <button className='text-container'  type='submitted' onClick={handleSubmit}>Sign Up</button>
        </div>
        <p className='heading'>Already have an account?  <a href='/'>Login</a></p>
      </div>
      </form>
   </div>
  );
}

export default SignUp;

import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';

function Register() {
  let navigate = useNavigate();
  const baseURL = "https://route-egypt-api.herokuapp.com/";
  const [flag, setFlag] = useState(false);
  const [messageFaild, setMessageFaild] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const [user, setUser] = useState({
    first_name:"",
    last_name:"",
    age: 0, 
    email:"",
    password:""
  });
  
  function getUserInput(e) {
    setErrorMessages([])
    let newUser = {...user};
    setUser(newUser, newUser[e.target.id] = e.target.value );
  };

  async function submitForm(e) {
    e.preventDefault();
    setFlag(true);
    const schema = Joi.object({
      first_name: Joi.string().alphanum().min(2).max(15).required(),
      last_name: Joi.string().alphanum().min(2).max(15).required(),
      age: Joi.number().min(16).max(80).required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().pattern(/^[a-z0-9]{4,20}$/i).required(),
  });
    let joiResponse = schema.validate(user, { abortEarly: false });

    
    if (joiResponse.error) {
      setFlag(false);
      setErrorMessages(joiResponse.error.details);
    }else{
      
     let {data} = await axios.post(`${baseURL}signup`, user);
     if (data.errors) {
      setMessageFaild(data.message);
     }else{
      navigate('/Login');
    }
    setFlag(false);
      
    }

}


  function getCurrentError(key) {
    for (const error of errorMessages) {
      if (error.context.key === key) {
        return error.message;
      }
    }
    return '';
    }


  return <>
    <div className="container">
      <div className="registeration w-75 m-auto">
        <h2 className="mt-4 mb-2">Registeration Form</h2>
        <form onSubmit={submitForm}>
          <label htmlFor="FirstName">First Name:</label>
          <input onChange={getUserInput} type="text" name="FirstName" id="first_name" className="input-group p-1 rounded-2 mb-1" />
          {getCurrentError('first_name').length == 0? '' : <div className="alert text-danger px-0 py-1 mb-1">{getCurrentError('first_name')}</div>}

          <label htmlFor="LastName">Last Name:</label>
          <input onChange={getUserInput} type="text" name="LastName" id="last_name" className="input-group p-1 rounded-2 mb-1" />
          {getCurrentError('last_name').length == 0? '' : <div className="alert text-danger px-0 py-1 mb-1">{getCurrentError('last_name')}</div>}

          <label htmlFor="Age">Age:</label>
          <input onChange={getUserInput} type="number" name="Age" id="age" className="input-group p-1 rounded-2 mb-1" />
          {getCurrentError('age').length == 0? '' : <div className="alert text-danger px-0 py-1 mb-1">{getCurrentError('age')}</div>}

          <label htmlFor="Email">Email:</label>
          <input onChange={getUserInput} type="email" name="Email" id="email" className="input-group p-1 rounded-2 mb-1" />
          {getCurrentError('email').length == 0? '' : <div className="alert text-danger px-0 py-1 mb-1">{getCurrentError('email')}</div>}

          <label htmlFor="Password">Password:</label>
          <input onChange={getUserInput} type="password" name="Password" id="password" className="input-group p-1 rounded-2 mb-1" />
          {getCurrentError('password').length == 0? '' : <div className="alert text-danger px-0 py-1 mb-1">{getCurrentError('password')}</div>}

          {messageFaild == 0 ? "" :<div className="alert text-danger mb-1 px-0 py-1 mt-2">{messageFaild}</div>}

          <button className="btn btn-outline-info mt-2">
            {flag? <i class="fa-solid fa-circle-notch fa-spin"></i> :"Register"}
          </button> 
        </form>
      </div>
    </div>
  </>
}

export default Register
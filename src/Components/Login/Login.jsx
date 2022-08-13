import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

function Login({decodeToken}) {
  let navigate = useNavigate();
  const baseURL = "https://route-egypt-api.herokuapp.com/";
  const [flag, setFlag] = useState(false);
  const [messageFaild, setMessageFaild] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const [user, setUser] = useState({
    email:"",
    password:""
  });
  
  function getUserInput(e) {
    setErrorMessages([]);
    let newUser = {...user};
    setUser(newUser, newUser[e.target.id] = e.target.value );
  };

  async function submitForm(e) {
    e.preventDefault();
    setFlag(true);
    const schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().pattern(/^[a-z0-9]{4,20}$/i).required(),
  });
    let joiResponse = schema.validate(user, { abortEarly: false });

    
    if (joiResponse.error) {
      setFlag(false);
      setErrorMessages(joiResponse.error.details);
    }else{
      
     let {data} = await axios.post(`${baseURL}signin`, user);
     
     if (data.status == 401) {
      setMessageFaild(data.message);
     }else{
      localStorage.setItem("userToken", data.token);
      decodeToken();
      navigate('/MovieTime');
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
        <h2 className="mt-4 mb-2">Login Form</h2>
        <form onSubmit={submitForm}>
          <label htmlFor="Email">Email:</label>
          <input onChange={getUserInput} type="email" name="Email" id="email" className="input-group p-1 rounded-2 mb-1" />
          {getCurrentError('email').length == 0? '' : <div className="alert text-danger px-0 py-1 mb-2 ">{getCurrentError('email')}</div>}

          <label htmlFor="Password">Password:</label>
          <input onChange={getUserInput} type="password" name="Password" id="password" className="input-group p-1 rounded-2 mb-1" />
          {getCurrentError('password').length == 0? '' : <div className="alert text-danger px-0 py-1 mb-1">{getCurrentError('password')}</div>}

          {messageFaild == 0 ? "" :<div className="alert text-danger mb-1 px-0 py-1 mt-2">{messageFaild}</div>}

          <div className="d-flex justify-content-between align-items-center flex-sm-row flex-column">
            <div className="registerText">Dont have account? <Link to="/Register">Register</Link></div>
            <button className="btn btn-outline-info mt-1">
              {flag? <i class="fa-solid fa-circle-notch fa-spin"></i> :"Login"}
              </button> 
          </div>

        </form>
      </div>
    </div>
  </>
}

export default Login

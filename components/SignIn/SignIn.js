import axios from 'axios';
import { useState } from 'react';
import Router from 'next/router';

import "./SignIn.scss";

const SignIn = ({ setCurrentDisplay }) => {
  
  // Set initial state of input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e) => {
    // prevents this script from running automatically, now will run only upon call
    e.preventDefault();


    let data = {
      email: email.trim().toLowerCase(),
      password: password.trim(),
    };


    axios.post('/users/signIn', data )
    .then((res) => {
      if(res.status == 200){
        // succcess
        Router.push('/landing');
      } else {
        // failiure in response
        alert('Incorrect email or password, please try again.');
      }
    })
    .catch((err) => {
      // failiure in request
      alert('Incorrect email or password, please try again.');
    });

  };
  
  return (
    <div className="sign-in">
      <h1 className="title">HangTrainer</h1>
      <div className="logo-div">
        <img className="logo-image" src='/static/BoulderLogo.png' />
      </div>

      <form className="sign-in-form" onSubmit={handleSignIn} htmlFor="user sign in form">
        <input className="sign-in-input" onChange={e => setEmail(e.target.value)} placeholder="Enter email address" />
        <input className="sign-in-input" type="password" onChange={e => setPassword(e.target.value)} placeholder="Enter password" />

        <button className="log-in-button" type="submit">Log in</button>
      </form>
        
      <div className="links">
        <button className="display-toggle" onClick={() => setCurrentDisplay('sign up')} value='Sign up' >Sign up</button>
        <a className="forgot-password" onClick={() => alert('This feature is comming soon!')}>Forgot your password?</a>
      </div>
    </div>
  );
};


export default SignIn;
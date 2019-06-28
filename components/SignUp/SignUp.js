import axios from 'axios';
import { useState } from 'react';
import Router from 'next/router';

import './SignUp.scss';

const SignUp = ({ setCurrentDisplay }) => {
  
  // Set initial state of input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');

  const handleSignUp = (e) => {
    // prevents this script from running automatically, now will run only upon call
    e.preventDefault();

    let data = {
      email: email.trim().toLowerCase(),
      password: password.trim(),
    };

    if(password.trim() === passwordConf.trim()) {
      axios.post('/users/create', data )
      .then((res) => {
        if(res.data.statusCode == 400){
          alert('Error with email address, please try again or use a different email');
        } else {
          Router.push('/landing');
          alert('Thanks for signing up!');
        }
      })
      .catch((err) => {
        alert('Error while signing up, please try again');
      });
    } else {
      alert('Password does not match password confirmation');
    }
  };

  return (
    <div className="sign-up">
      <h1 className="sign-title">HangTrainer</h1>

      <div className="logo-div">
        <img className="logo-image" src='/static/BoulderLogo.png' />
      </div>

      <form className="sign-up-form" onSubmit={handleSignUp} htmlFor="user sign up form">
        <input className="sign-up-input" type="text" onChange={e => setEmail(e.target.value)} placeholder="Enter email address"/>
        <input className="sign-up-input" type="password" onChange={e => setPassword(e.target.value)} placeholder="Enter password"/>  
        <input className="sign-up-input" type="password" onChange={e => setPasswordConf(e.target.value)} placeholder="Password confirmation"/>
  
        <button className="sign-up-button" type="submit" >Sign up</button>

        <button className="sign-up-toggle" onClick={() => setCurrentDisplay('sign in')} >Log in</button>
      </form>
    </div>
  );
};


export default SignUp;
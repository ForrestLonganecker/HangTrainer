import axios from 'axios';
import { useState } from 'react';

import './SignUp.scss';

const SignUp = ({ setCurrentDisplay }) => {
  // Set initial state of input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = (e) => {
    // prevents this script from running automatically, now will run only upon call
    e.preventDefault();

    let data = {
      email: email,
      password: password,
    };

    if(password === passwordConf) {
      axios.post('/users/create', data )
      .then((res) => {
        if(res.data.statusCode == 400){
          setError('Error with email address, please try again or use a different email');
          handleDisplayError();
        } else {
          window.location = '/landing';
        }
      })
      .catch((err) => {
        console.log(err);
        window.location = '/';
      });
    } else {
      setError('Password does not match password confirmation');
      handleDisplayError();
    }
  };

  const handleDisplayError = () => {
    if(error){
      return(
        <section className="error">{error}
        <style jsx>{`
        .error {
          background-color: red;
          color: white;
        } 
        `}</style>
        </section>

      );
    }
  };
  
  return (
    <div className="sign-up">
      <h1 className="title">HangTrainer</h1>

      <div className="logo-div">
        <img className="logo-image" src='/static/BoulderLogo.png' />
      </div>

      {handleDisplayError()}

      <form className="sign-up-form" onSubmit={handleSignUp} htmlFor="user sign up form">
        <input className="sign-up-input" type="text" onChange={e => setEmail(e.target.value)} placeholder="Enter email address"/>
        <input className="sign-up-input" type="password" onChange={e => setPassword(e.target.value)} placeholder="Enter Password"/>  
        <input className="sign-up-input" type="password" onChange={e => setPasswordConf(e.target.value)} placeholder="Password confirmation"/>
  
        <button className="sign-up-button" type="submit" >Sign up</button>

        <button className="sign-up-toggle" onClick={() => setCurrentDisplay('sign in')} >Log in</button>
      </form>
    </div>
  );
};


export default SignUp;
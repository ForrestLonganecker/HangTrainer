import axios from 'axios';
import { useState } from 'react';

import "./SignIn.scss";

const SignIn = ({ setCurrentDisplay }) => {
  // Set initial state of input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = (e) => {
    // prevents this script from running automatically, now will run only upon call
    e.preventDefault();


    let data = {
      email: email,
      password: password,
    };


    axios.post('/users/signIn', data )
    .then((res) => {
      console.log('{SIGNUP PAGE} RES: ', res);
      // routes the client side back to /index page
      if(res.status == 200){
        console.log('{INDEX} SUCCESS, ROUTING TO /LANDING: ', res.status);
        window.location = '/landing';
      } else {
        console.log('SOMETHING WENT WTRONG: ', res.statusCode)
        setError('Incorrect email or password, please try again.');
        handleDisplayError();
      }
    })
    .catch((err) => {
      console.log(err);
      setError('Incorrect email or password, please try again.');
      handleDisplayError();
    });

  };

  const handleDisplayError = () => {
    if(error){
      return(
        <section className="error">{error}
        <style jsx>{`
        .error {
          margin-top: 20px;
          margin-bottom: 20px;
          background-color: red;
          color: white;
          text-align: center;
        } 
        `}</style>
        </section>

      );
    }
  };
  
  return (
    <div className="signin-up">
      <h1 className="title">HangTrainer</h1>
      <div className="logo-div">
        <img className="logo-image" src='/static/BoulderLogo.png' />
      </div>

      {handleDisplayError()}

      <form className="sign-in-form" onSubmit={handleSignIn} htmlFor="user sign in form">
        <input onChange={e => setEmail(e.target.value)} placeholder="Enter email address" />
        <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Enter password" />
        <button type="submit">Log in</button>
      </form>
        
      <div className="links">
        <input className="display-toggle" onClick={() => setCurrentDisplay('sign up')} value='Sign up' />
        <a className="forgot-password">Forgot your password?</a>
      </div>
    </div>
  );
};


export default SignIn;
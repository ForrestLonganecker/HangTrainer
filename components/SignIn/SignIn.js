import axios from 'axios';
import { useState } from 'react';
import Router from 'next/router';

import "./SignIn.scss";

const SignIn = ({ setCurrentDisplay }) => {
  // Set initial state of input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState('');

  const handleSignIn = (e) => {
    // prevents this script from running automatically, now will run only upon call
    e.preventDefault();


    let data = {
      email: email.trim().toLowerCase(),
      password: password.trim(),
    };


    axios.post('/users/signIn', data )
    .then((res) => {
      console.log('{SIGNUP PAGE} RES: ', res);
      // routes the client side back to /index page
      if(res.status == 200){
        console.log('{INDEX} SUCCESS, ROUTING TO /LANDING: ', res.status);
        // window.location = '/landing';
        Router.push('/landing');
      } else {
        alert('Incorrect email or password, please try again.');
        // console.log('SOMETHING WENT WTRONG: ', res.statusCode)
        // setError('Incorrect email or password, please try again.');
        // handleDisplayError();
      }
    })
    .catch((err) => {
      console.log(err);
      alert('Incorrect email or password, please try again.');
      // setError('Incorrect email or password, please try again.');
      // handleDisplayError();
    });

  };

  // const handleDisplayError = () => {
  //   if(error){
  //     return(
  //       <section className="error">{error}
  //       <style jsx>{`
  //       .error {
  //         margin-top: 20px;
  //         margin-bottom: 20px;
  //         background-color: red;
  //         color: white;
  //         text-align: center;
  //       } 
  //       `}</style>
  //       </section>

  //     );
  //   }
  // };
  
  return (
    <div className="sign-in">
      <h1 className="title">HangTrainer</h1>
      <div className="logo-div">
        <img className="logo-image" src='/static/BoulderLogo.png' />
      </div>

      {/*handleDisplayError()*/}

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
import axios from 'axios';
import { useState } from 'react';
// import authHelper from '../server/auth/helpers';

const SignIn = ({ setCurrentDisplay }) => {
  // Set initial state of input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = (e) => {
    // prevents this script from running automatically, now will run only upon call
    e.preventDefault();

    // let hashedPassword = authHelper.encryptPass(password);

    let data = {
      email: email,
      password: password,
      // password: hashedPassword,
    };

    // console.log(axios.post('/users/signIn', data ));

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
          background-color: red;
          color: white;
        } 
        `}</style>
        </section>

      );
    }
  };
  
  return (
    <section>
      <h1>HangTrainer</h1>
      <img src='/static/BoulderLogo.png' />
      <h2>Sign in</h2>
      <p>Welcome back! Keep up the great work!</p>

      {handleDisplayError()}

      <form onSubmit={handleSignIn} htmlFor="user sign in form">
        <section>
          <label htmlFor="email entry">Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} />
        </section>
  
        <section>
          <label htmlFor="password entry">Password</label>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </section>
  
        <input type="submit" value="Sign in" />
      </form>
      <input className="display-toggle" onClick={() => setCurrentDisplay('sign up')} value='Sign up' />
    </section>
  );
};


export default SignIn;
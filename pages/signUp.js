import axios from 'axios';
import { useState } from 'react';
// import authHelper from '../server/auth/helpers';

const SignUp = () => {
  // Set initial state of input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');

  const handleSignUp = (e) => {
    // prevents this script from running automatically, now will run only upon call
    e.preventDefault();

    // let hashedPassword = authHelper.encryptPass(password);

    let data = {
      email: email,
      password: password,
      // password: hashedPassword,
    }

    // console.log(data);

    // console.log(axios.post('/users/create', data ));

    console.log(password, passwordConf);
    if(password === passwordConf) {
      axios.post('/users/create', data )
      .then((res) => {
        // routes the client side back to /index page
        console.log('{SIGNUP PAGE} RES.DATA(req.user): ', res.data);
        if(res.status == 200){
          window.location = '/landing';
        } else {
          console.log('{SIGNUP PAGE} ERROR WHEN CREATING USER: ', res.status)
        }
      })
      .catch((err) => {
        console.log('{SIGNUP PAGE} ERR: ', err);
        window.location = '/signUp';
      });
    } else {
      console.log('PASSWORD/PASSWORDCONF DO NOT MATCH');
    }
  }
  
  return (
    <section>
      <h1>HangTrainer</h1>
      <img src='/static/BoulderLogo.png' />
      <h2>Sign up</h2>
      <p>Sign up and start keeping track of progress!</p>

      <form onSubmit={handleSignUp} htmlFor="user sign up form">
        <section>
          <label htmlFor="email entry">Email</label>
          <input type="text" onChange={e => setEmail(e.target.value)} />
          <small>email address must be a valid address</small>
        </section>
  
        <section>
          <label htmlFor="password entry">Password</label>
          <input type="password" onChange={e => setPassword(e.target.value)} />
          <small>password must match confirmation below</small>
        </section>
  
        <section>
          <label htmlFor="password confirmation entry">Password confirmation</label>
          <input type="password" onChange={e => setPasswordConf(e.target.value)} />
        </section>
  
        <input type="submit" value="Sign up" />
      </form>
      <a href="/">Sign in</a>
    </section>
  )
}


export default SignUp;
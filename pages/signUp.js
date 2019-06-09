import Navbar from '../components/Navbar/Navbar';
import axios from 'axios';
import { useState } from 'react';
import authHelper from '../server/auth/helpers';

// https://github.com/jimmylee/next-postgres/blob/3206c567e874c0438202fb84fab0f45809659f7c/components/CommentPreview.js#L45


const SignUp = () => {
  // Set initial state of input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');

  const handleSignUp = (e) => {
    // prevents this script from running automatically, now will run only upon call
    e.preventDefault();

    const hashedPassword = authHelper.encryptPass(password);

    let data = {
      email: email,
      password: hashedPassword,
    }

    // console.log(data);

    // console.log(axios.post('/users/create', data ));

    axios.post('/users/create', data )
    .then((res) => {
      // routes the client side back to /index page
      console.log('{SIGNUP PAGE} RES.DATA(req.user): ', res.data);
      if(res.status == 200){
        window.location = '/';
      } else {
        console.log('{SIGNUP PAGE} ERROR WHEN CREATING USER: ', res.status)
      }
    })
    // .catch((err) => {
    //   console.log('{SIGNUP PAGE} ERR: ', err);
    //   window.location = '/signUp';
    // });
  }
  
  return (
    <section>
      <h1>Sign up</h1>
      <Navbar />
      <p>Sign up to start recording your hangs!</p>
      {/* action/method need to be defined as fn above */}
      <form onSubmit={handleSignUp} htmlFor="user sign up form">
        <section>
          <label htmlFor="email entry">Email</label>
          <input defaultValue="Enter email" onChange={e => setEmail(e.target.value)} />
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
    </section>
  )
}


export default SignUp;
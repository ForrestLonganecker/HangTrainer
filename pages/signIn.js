// this page is now not in use, Index page is the signin

// import Navbar from '../components/Navbar/Navbar';
// import axios from 'axios';
// import { useState } from 'react';
// import authHelper from '../server/auth/helpers';

// // https://github.com/jimmylee/next-postgres/blob/3206c567e874c0438202fb84fab0f45809659f7c/components/CommentPreview.js#L45


// const SignIn = () => {
//   // Set initial state of input fields
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignIn = (e) => {
//     // prevents this script from running automatically, now will run only upon call
//     e.preventDefault();

//     // let hashedPassword = authHelper.encryptPass(password);

//     let data = {
//       email: email,
//       password: password,
//       // password: hashedPassword,
//     }

//     // console.log(axios.post('/users/signIn', data ));

//     axios.post('/users/signIn', data )
//     .then((res) => {
//       console.log('{SIGNUP PAGE} RES: ', res);
//       // routes the client side back to /index page
//       if(res.status == 200){
//         window.location = '/';
//       } else {
//         console.log('SOMETHING WENT WTRONG: ', res.statusCode)
//       }
//     });
//     // .catch((err) => {
//     //   console.log('{SIGNUP PAGE} ERR: ', err);
//     //   window.location = '/signIn';
//     // });
//   }
  
//   return (
//     <section>
//       <h1>Sign in</h1>
//       <Navbar />
//       <p>Welcome back! Keep up the great work!</p>

//       <form onSubmit={handleSignIn} htmlFor="user sign in form">
//         <section>
//           <label htmlFor="email entry">Email</label>
//           <input value={email} onChange={e => setEmail(e.target.value)} />
//         </section>
  
//         <section>
//           <label htmlFor="password entry">Password</label>
//           <input type="password" onChange={e => setPassword(e.target.value)} />
//         </section>
  
//         <input type="submit" value="Sign in" />
//       </form>
//     </section>
//   )
// }


// export default SignIn;
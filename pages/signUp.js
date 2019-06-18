// import axios from 'axios';
// import { useState } from 'react';

// const SignUp = () => {
//   // Set initial state of input fields
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [passwordConf, setPasswordConf] = useState('');
//   const [error, setError] = useState('');

//   const handleSignUp = (e) => {
//     // prevents this script from running automatically, now will run only upon call
//     e.preventDefault();

//     let data = {
//       email: email,
//       password: password,
//     };

//     if(password === passwordConf) {
//       axios.post('/users/create', data )
//       .then((res) => {
//         if(res.data.statusCode == 400){
//           setError('Error with email address, please try again or use a different email');
//           handleDisplayError();
//         } else {
//           window.location = '/landing';
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         window.location = '/signUp';
//       });
//     } else {
//       setError('Password does not match password confirmation');
//       handleDisplayError();
//     }
//   };

//   const handleDisplayError = () => {
//     if(error){
//       return(
//         <section className="error">{error}
//         <style jsx>{`
//         .error {
//           background-color: red;
//           color: white;
//         } 
//         `}</style>
//         </section>

//       );
//     }
//   };
  
//   return (
//     <section>
//       <h1>HangTrainer</h1>
//       <img src='/static/BoulderLogo.png' />
//       <h2>Sign up</h2>

//       <p>Sign up and start keeping track of progress!</p>

//       {handleDisplayError()}

//       <form onSubmit={handleSignUp} htmlFor="user sign up form">
//         <section>
//           <label htmlFor="email entry">Email</label>
//           <input type="text" onChange={e => setEmail(e.target.value)} />
//           <small>email address must be a valid address</small>
//         </section>
  
//         <section>
//           <label htmlFor="password entry">Password</label>
//           <input type="password" onChange={e => setPassword(e.target.value)} />
//           <small>password must match confirmation below</small>
//         </section>
  
//         <section>
//           <label htmlFor="password confirmation entry">Password confirmation</label>
//           <input type="password" onChange={e => setPasswordConf(e.target.value)} />
//         </section>
  
//         <input type="submit" value="Sign up" />
//       </form>
//       <a href="/">Sign in</a>
//     </section>
//   );
// };


// export default SignUp;
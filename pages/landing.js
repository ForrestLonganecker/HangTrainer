// this page should only be viewable when logged in after signIn/signUp
// user should be redirected to this page

import { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';

// importing app level SCSS
import '../scss/styles.scss';


const Index = () => {
  const [currentUser, setCurrentUser] = useState(false);

  const displayLanding = () => {
    axios.get('/static/index')
    .then(res => {
      console.log('{LANDING.JS} RES: ', res.data);
      if(res.data == 'USER SIGNED IN'){
        setCurrentUser(true);
      } else {
        setCurrentUser(false);
      }
    });
    // return <Landing currentUser />
    // if(currentUser){
      return (
        <section>
          <h1>HangTrainer</h1>
          <Navbar />
          <p>Welcome to HangTrainer, create your first workout and start Hanging!</p>
          <h2>Current User: {currentUser.toString()}</h2>
        </section>
      );
    // } else {
    //   // reroute to signin if there is no user
    //   // window.location.replace('/landing')
    // }
  }

  return (
    displayLanding()  
  );
}


export default Index;
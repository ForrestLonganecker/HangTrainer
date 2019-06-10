import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

// importing app level SCSS
import '../scss/styles.scss';


const Index = () => {
  const [currentUser, setCurrentUser] = useState(false);

  const displayLanding = () => {
    axios.get('http://localhost:3000/static/index')
    .then(res => {
      console.log('{INDEX.JS} RES: ', res)
      if(res.data == 'USER SIGNED IN'){
        setCurrentUser(true);
      } else {
        setCurrentUser(false);
      }
    });
    // return <Landing currentUser />
    if(currentUser){
      return (
        <section>
          <h1>HangTrainer</h1>
          <img src='/static/BoulderLogo.png' />
          <h2>Current User: {currentUser.toString()}</h2>
          <Navbar />
          <p>Welcome to HangTrainer, Sign up and start tracking your Hangs!</p>
          </section>
          );
    } else {
      window.location('/');
    }
  }

  return (
    displayLanding()  
  );
}


export default Index;
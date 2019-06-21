// This page should serve as a message board letting users know about new features

import { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';
import Landing from '../components/Landing/Landing';

const Index = () => {
  const [currentUser, setCurrentUser] = useState(false);

  const displayLanding = () => {
    axios.get('/static/index')
    .then(res => {
      console.log('{LANDING.JS} RES: ', res.data);
      if(res.data){
        setCurrentUser(true);
      } else {
        setCurrentUser(false);
      }
    })
    .catch((err) => {
      setCurrentUser(false);
      console.log('{LANDING.JS} ERR: ');
    });

    if(currentUser){
      return (
        <Landing />
      );
    } else {
      return(
        <div className="no-user">
          <h1>Sorry you must be logged-in to do that</h1>
          <h2>Current User: {currentUser.toString()}</h2>
          <a href='/'>Sign in</a>
        </div>
      );
    }
  };

  return (
    displayLanding()  
  );
};

// Index.getInitialProps = async ({req}) => {
//   const res = await fetch('http://localhost:3000/static/index');
//   const json = await res.json();
//   return { json }
// }


export default Index;
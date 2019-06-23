// This page should serve as a message board letting users know about new features

import { useState } from 'react';
import axios from 'axios';

import Landing from '../components/Landing/Landing';

import '../scss/styles.scss';

const LandingPage = ({ user }) => {
  const [currentUser, setCurrentUser] = useState(user);

  const displayLanding = () => {
  //  axios.get('/static/index')
  //   .then(res => {
  //     console.log('{LANDING.JS} RES: ', res.data);
  //     if(res.data){
  //       setCurrentUser(true);
  //     } else {
  //       setCurrentUser(false);
  //     }
  //   })
  //   .catch((err) => {
  //     setCurrentUser(false);
  //     console.log('{LANDING.JS} ERR: ');
  //   });

    // isAuthenticated
    if(currentUser.id){
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

LandingPage.getInitialProps = async ({req}) => {
  console.log('{LANDING PAGE} GET INITIAL PROPS REQ: ');
  const res = await axios.get('/static/index');
  console.log('{LANDING PAGE} GET INITIAL PROPS RES: ', res.data);
  const data = await res.data;
  console.log('{LANDING PAGE} GET INITIAL PROPS DATA: ');

  // change logic so that if !currentUser Router.push('/') else? 
  // then pass data into page and render
  return { user: data };
};


export default LandingPage;
// This page should serve as a message board letting users know about new features

import { useState } from 'react';
import axios from 'axios';
import Router from 'next/router';

import Landing from '../components/Landing/Landing';

import '../scss/styles.scss';

const LandingPage = (/*{ user }*/) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const displayLanding = () => {
   axios.get('/static/index')
    .then(res => {
      console.log('{LANDING.JS} RES: ', res.data);
      if(res.data){
        setIsAuthenticated(true);
      } else {
        Router.push('/');
        // setCurrentUser(false);
      }
    });
    // .catch((err) => {
    //   setCurrentUser(false);
    //   Router.push('/');
    //   console.log('{LANDING.JS} ERR: ');
    // });

    // isAuthenticated
    if(isAuthenticated){
      return (
        <Landing />
      );
    } else {
      return null;
    }
  };

  return (
    displayLanding()  
  );
};

// LandingPage.getInitialProps = async ({req}) => {
//   console.log('{LANDING PAGE} GET INITIAL PROPS REQ: ');
//   const res = await axios.get('/static/index');
//   console.log('{LANDING PAGE} GET INITIAL PROPS RES: ', res.data);
//   const data = await res.data;
//   console.log('{LANDING PAGE} GET INITIAL PROPS DATA: ');

//   // change logic so that if !currentUser Router.push('/') else? 
//   // then pass data into page and render
//   return { user: data };
// };


export default LandingPage;
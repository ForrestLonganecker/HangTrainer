import { useState } from 'react';
import axios from 'axios';
import Router from 'next/router';

import Landing from '../components/Landing/Landing';

import '../scss/styles.scss';

const LandingPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const displayLanding = () => {
   axios.get('/static/index')
    .then(res => {
      if(res.data){
        setIsAuthenticated(true);
      } else {
        Router.push('/');
      }
    })
    .catch((err) => {
      Router.push('/');
    });

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

export default LandingPage;
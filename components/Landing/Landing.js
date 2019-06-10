import React, { Component } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

const Landing = (props) => {


  const displayLanding = () => {
    console.log('{LANDING.JS CURRENTUSER}: ', props.currentUser);
    if(props.currentUser){
      return(
        <section>
          <h1>HangTrainer</h1>
          <h2>Current User: {props.currentUser.toString()}</h2>
          <Navbar />
          <p>Welcome to HangTrainer, Hang On!</p>
        </section>
        )
    } else {
      return(
        <section>
          <h1>HangTrainer</h1>
          <h2>Current User: {props.currentUser.toString()}</h2>
          <Navbar />
          <p>Sign in to start hanging!</p>
        </section>
      )
    }
  }


  return (
    displayLanding()
  );
}

export default Landing;
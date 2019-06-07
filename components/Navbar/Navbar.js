import React, { Component } from 'react';
import Link from 'next/link';
import axios from 'axios';

// importing component level SCSS
import './Navbar.scss';

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.props = props
  }

  displayUser(){
    if(currentUser){
      return(currentUser.email);
    } else {
      return('Sign up and Hang ON!');
    }
  }

    handleSignOut = (e) => {
    // prevents this script from running automatically, now will run only upon call
    e.preventDefault();

    console.log(axios.get('/users/signOut'));

    axios.get('/users/signOut')
    .then((res) => {
      // routes the client side back to /index page
      console.log('{SIGNUP PAGE} RES: ', res);
      // if(res.data == 'Success!') window.location = '/';
    })
    .catch((err) => {
      console.log('{SIGNUP PAGE} ERR: ', err);
      // window.location = '/';
    });
  }

  render() {
    return (
      <nav>
        <mark className="badge">Hang on!</mark>
        <section>
          <Link href="/">
            <a title="HangTrainer Home">Home</a>
          </Link>
          <Link href="/about">
            <a title="About HangTrainer">About</a>
          </Link>
          <Link href="/workouts">
            <a title="Public Workouts">Workouts</a>
          </Link>
          <Link href="/signUp">
            <a title="Sign up">Sign up</a>
          </Link>
          <Link href="/signIn">
            <a title="Sign in">Sign in</a>
          </Link>
          <Link href="/signOut">
            <a title="Sign in" onClick={this.handleSignOut}>Sign out</a>
          </Link>
        </section>
      </nav>
    )
  }
}

export default Navbar;
import React, { Component } from 'react';
import Link from 'next/link';

// importing component level SCSS
import './Navbar.scss';

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.props = props
  }

  render() {
    return (
      <nav>
        <mark className="badge">Hang ON!</mark>
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
        </section>
      </nav>
    )
  }
}

export default Navbar;
import React, { Component } from 'react';
import Link from 'next/link';

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.props = props
  }

  render() {
    return (
      <nav>
        <section>
          <Link href="/">
            <a title="HangTrainer Home">Home</a>
          </Link>
          <Link href="/about">
            <a title="About HangTrainer">About</a>
          </Link>
          <Link href="/api">
            <a title="Our API">API</a>
          </Link>
        </section>
      </nav>
    )
  }
}

export default Navbar;
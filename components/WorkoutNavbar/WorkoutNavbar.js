import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';

// importing component level SCSS
import './WorkoutNavbar.scss';

const WorkoutNavbar = () => {

    const handleSignOut = (e) => {
    // prevents this script from running automatically, now will run only upon call
    e.preventDefault();

    axios.get('/users/signOut')
    .then((res) => {
      if(res.status == 200){
        Router.push('/');
      } else {
        alert('Something went wrong.');
      }
    });
  };

  return (
    <nav className="nav">
      <Link href="/landing">
        <a className="landing-link" title="HangTrainer Home"><img className="logo-icon" src="/static/BoulderLogo.png" /></a>
      </Link>
      <h1 className="title">HangTrainer</h1>
      <Link>
        <a className="user-profile-icon" title="User profile information" onClick={() => alert('This feature is coming soon!')}><i className="fas fa-cog"></i></a>
      </Link>
      <Link href="/signOut">
        <a className="sign-out-icon" title="Sign out" onClick={e => handleSignOut(e)}><i className="fas fa-sign-out-alt"></i></a>
      </Link>
    </nav>
  );
};

export default WorkoutNavbar;
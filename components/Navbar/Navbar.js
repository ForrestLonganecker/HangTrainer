import Link from 'next/link';
import axios from 'axios';

// importing component level SCSS
import './Navbar.scss';

const Navbar = () => {

    const handleSignOut = (e) => {
    // prevents this script from running automatically, now will run only upon call
    e.preventDefault();

    axios.get('/users/signOut')
    .then((res) => {
      if(res.status == 200){
        window.location = '/';
        console.log('YOU HAVE SIGNED OUT SUCCESSFULLY!');
      } else {
        console.log('SOMETHING WENT WRONG: ', res.status);
      }
    });
  };

  return (
    <nav className="nav">
      <Link href="/landing">
        <a className="landing-link" title="HangTrainer Home"><img className="logo-icon" src="/static/BoulderLogo.png" /></a>
      </Link>
      <h1 className="title">HangTrainer</h1>
      <Link href="/workouts">
        <a className="workouts-icon" title="Public Workouts"><i className="fas fa-dumbbell"></i></a>
      </Link>
      <Link href="/signOut">
        <a className="sign-out-icon" title="Sign out" onClick={e => handleSignOut(e)}><i className="fas fa-sign-out-alt"></i></a>
      </Link>
    </nav>
  );
};

export default Navbar;
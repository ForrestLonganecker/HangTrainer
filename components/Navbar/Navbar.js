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
    <nav>
      <mark className="badge">Hang on!</mark>
      <section>
        <Link href="/landing">
          <a className="logo-icon" title="HangTrainer Home"><img src="/static/BoulderLogo.png" /></a>
        </Link>
{/* 
          <Link href="/about">
          <a title="About HangTrainer">About</a>
          </Link>
*/}
        <Link href="/workouts">
          <a className="workouts-icon" title="Public Workouts">Workouts</a>
        </Link>
        <Link href="/signOut">
          <a className="user-settings-icon" title="Sign in" onClick={e => handleSignOut(e)}>Sign out</a>
        </Link>
      </section>
      <style jsx>{`
      img {
        max-width: 50px;
      }
      `}</style>
    </nav>
  );
};

export default Navbar;
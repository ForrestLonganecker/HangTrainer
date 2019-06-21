import LandingNavbar from '../LandingNavbar/LandingNavbar';

import './Landing.scss';

const Landing = () => {

  return (
    <div className="landing">
      <LandingNavbar />
      <p className="landing-welcome">Welcome to HangTrainer, create your first workout and start Hanging!</p>

      <section className="update-container">
        <h3 className="update-header">Recent updates:</h3>
        <ul className="update-list">
          <li className="update-item">
            <p className="update-text">
              You can now Create, Edit and Delete workouts!
            </p>
            <p className="update-text">
              Currently Workouts are composed of a Name and notes.
            </p>
            <p className="update-text">
              More soon to come!
            </p>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Landing;
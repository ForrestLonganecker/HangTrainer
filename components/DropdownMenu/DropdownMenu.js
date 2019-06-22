import { useState } from 'react';

import './DropdownMenu.scss';

const DropdownMenu = ({ setCurrentDisplay, icon }) => {
  
  const [displayMenu, setDisplayMenu] = useState(false);

  const toggleDropdownMenu = (e) => {
    e.preventDefault();
    setDisplayMenu(!displayMenu);
  };

  const menu = () => {
    if(displayMenu){
      return(
        <div className="drop-down">
          <button className="drop-down-button" onClick={() => setCurrentDisplay('create workout')} >Create Workout</button>
          <button className="drop-down-button" onClick={() => setCurrentDisplay('show workouts')} >Browse Workouts</button>
        </div>
      );
    } else {
      null;
    }
  };

  return(
    <div className="dropdown-container"> 
      {menu()}
      <div className="dropdown-menu-toggle" onClick={toggleDropdownMenu}>{icon}</div>
    </div>
  );
};

export default DropdownMenu;
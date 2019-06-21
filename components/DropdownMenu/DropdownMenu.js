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
          <button onClick={() => setCurrentDisplay('create workout')} >Create Workout</button>
          <button onClick={() => setCurrentDisplay('show workouts')} >Browse Workouts</button>
        </div>
      );
    } else {
      null;
    }
  };

  return(
    <div>
      <div className="dropdownMenuToggle" onClick={toggleDropdownMenu}>{icon}</div>
      {menu()}
      <style jsx>{`
        .dropdownMenuToggle {
          border: solid;
        }
      `}</style>
    </div>
  );
};

export default DropdownMenu;
import { useState } from 'react';

import './DropdownMenu.scss';

const DropdownMenu = ({ currentDisplay, setCurrentDisplay, setEditingWorkout, icon }) => {
  
  const [displayMenu, setDisplayMenu] = useState(false);

  const toggleDropdownMenu = (e) => {
    e.preventDefault();
    setDisplayMenu(!displayMenu);
  };

  const handleCreateButton = () => {
    setCurrentDisplay('create workout');
    setEditingWorkout({});
  };

  const handleBrowseButton = () => {
    setCurrentDisplay('browse workouts');
  };

  const menu = () => {
    if(displayMenu){
      return(
        <div className="drop-down">
          <button className="drop-down-button" onClick={() => handleCreateButton()} >Create Workout</button>
          <button className="drop-down-button" onClick={() => handleBrowseButton()} >Browse Workouts</button>
        </div>
      );
    } else {
      return (
        <div className="drop-down">
          <p className="drop-down-label">{currentDisplay}</p>
        </div>
      );
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
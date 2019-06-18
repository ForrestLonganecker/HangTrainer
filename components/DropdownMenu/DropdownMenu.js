import { useState } from 'react';

const DropdownMenu = ({ setCurrentDisplay }) => {
  
  const [displayMenu, setDisplayMenu] = useState(false);

  const toggleDropdownMenu = (e) => {
    e.preventDefault();
    setDisplayMenu(!displayMenu);
    console.log('CLICKED', displayMenu);
  };

  const menu = () => {
    if(displayMenu){
      return(
        <ul>
          <button onClick={setCurrentDisplay('create workout')} >Create Workout</button>
          <button onClick={setCurrentDisplay('show workouts')} >Browse Workouts</button>
        </ul>
      );
    }
  };

  return(
    <div>
      <div className="dropdownMenuToggle" onClick={toggleDropdownMenu}>Menu icon</div>
      {menu}
    </div>
  );
};

export default DropdownMenu;
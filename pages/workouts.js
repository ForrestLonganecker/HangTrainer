import { useState } from 'react';
import axios from 'axios';

import Navbar from '../components/Navbar/Navbar';
import DropdownMenu from '../components/DropdownMenu/DropdownMenu';
import ErrorSplash from '../components/ErrorSplash/ErrorSplash';
import WorkoutsDisplay from '../components/WorkoutsDisplay/WorkoutsDisplay';
import WorkoutCreator from '../components/WorkoutCreator/WorkoutCreator';
import WorkoutEditor from '../components/WorkoutEditor/WorkoutEditor';

// map workouts to an object in local state, so I can add/remove from specific
// key rather than iterating through all.

const Workouts = ({ workouts }) => {

  const [currentDisplay, setCurrentDisplay] = useState('workout creator');
  const [editingWorkout, setEditingWorkout] = useState({});

  const selectEditWorkout = (e, selectedWorkout) => {
    e.preventDefault();
    console.log('{SELECT EDIT WORKOUOT} BUTTON PRESSED: ', selectedWorkout);
    // how to map a new object with useState
    setEditingWorkout(editingWorkout => {
      return {...editingWorkout, ...selectedWorkout};
    });
    // Comes back with expected value after the second button press
    console.log('{EDITING WORKOUT} AFTER BUTTON PRESS: ', editingWorkout);
  };

  // this will be needed at page level for any page that may display an error
  // will need to pass down to children components:
  const [error, setError] = useState('');
  
  const passError = (newError) => {
    setError(newError);
  };

  // const PageComponent = ... return(
  // <ChildComponent passError={passError} /> )

  // called in ChildComponent:
  // const ChildComponent = ({ passError }) => {  
  // passError('error string goes here') };

  // how to add items to state that is an array, [...stateArray, addItem]
  // const addToState = (addOn) => {
  //   setMyWorkouts([...myWorkouts, addOn]);
  // }


  return (
    <div>
      <h1>HangTrainer</h1>
      <Navbar />
      <h2>Workouts:</h2>

      <DropdownMenu />
    
      <ErrorSplash error={error} />

      <WorkoutCreator 
        passError={passError}
        workouts={workouts}
      />

      <WorkoutEditor
        passError={passError}
        editingWorkout={editingWorkout}
        selectEditWorkout={selectEditWorkout}
      />

      <WorkoutsDisplay
        passError={passError}
        workouts={workouts}
        selectEditWorkout={selectEditWorkout}
      />
    </div>
  );
};

Workouts.getInitialProps = async ({req}) => {
  console.log('{WORKOUTS PAGE} GET INITIAL PROPS REQ:', req);
  const res = await axios.get('/workouts/myWorkouts');
  console.log('{WORKOUTS PAGE} GET INITIAL PROPS RES:', res);
  const data = await res.data;
  console.log('{WORKOUTS PAGE} GET INITIAL PROPS DATA:', data);
  return { workouts: data };
};

export default Workouts;
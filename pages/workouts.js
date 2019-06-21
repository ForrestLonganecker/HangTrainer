import { useState } from 'react';
import axios from 'axios';

import WorkoutNavbar from '../components/WorkoutNavbar/WorkoutNavbar';
import DropdownMenu from '../components/DropdownMenu/DropdownMenu';
import ErrorSplash from '../components/ErrorSplash/ErrorSplash';
import WorkoutsDisplay from '../components/WorkoutsDisplay/WorkoutsDisplay';
import WorkoutCreator from '../components/WorkoutCreator/WorkoutCreator';

import '../scss/workouts.scss';
// map workouts to an object in local state, so I can add/remove from specific
// key rather than iterating through all.

const Workouts = ({ workouts }) => {

  const [currentDisplay, setCurrentDisplay] = useState('landing');
  const [editingWorkout, setEditingWorkout] = useState({});

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

  // how to replace object state value
  // const selectEditWorkout = (e, selectedWorkout) => {
  //   e.preventDefault();
  //   console.log('{SELECT EDIT WORKOUOT} BUTTON PRESSED: ', selectedWorkout);
  //   // how to map a new object with useState
  //   setEditingWorkout(editingWorkout => {
  //     return {...editingWorkout, ...selectedWorkout};
  //   });
  //   // Comes back with expected value after the second button press
  //   console.log('{EDITING WORKOUT} AFTER BUTTON PRESS: ', editingWorkout);
  // };

  const handleDisplay = () => {
    
    if(currentDisplay === 'landing'){
      return(
        <div className="workout-landing">
          <button onClick={() => setCurrentDisplay('create workout')} >Create Workout</button>
          <button onClick={() => setCurrentDisplay('show workouts')} >Browse Workouts</button>
          <style jsx>{`
            .workout-landing {
              display: flex;
              flex-direction: column;
              margin-top: 10px;
            },
            .workout-landing > button {
              margin-bottom: 10px;
            }
          `}</style>
        </div>
      );
    }

    if(currentDisplay === 'create workout'){
      return(
        <WorkoutCreator
          passError={passError}
          workouts={workouts}
        />
      );
    }

    if(currentDisplay === 'show workouts'){
      return(
        <WorkoutsDisplay
          passError={passError}
          workouts={workouts}
          setEditingWorkout={setEditingWorkout}
          editingWorkout={editingWorkout}
        />
      );
    }
  };


  return (
    <div className="workouts-container">
      <WorkoutNavbar />

      <div className="workout-banner">
        <h2>Workouts:</h2>

        <DropdownMenu 
          setCurrentDisplay={setCurrentDisplay}
          icon={<i className="fas fa-dumbbell"></i>}
        />
      </div>
    
      <ErrorSplash error={error} />

      {handleDisplay()}

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
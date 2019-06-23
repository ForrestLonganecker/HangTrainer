import { useState, useEffect } from 'react';
import axios from 'axios';

import WorkoutNavbar from '../components/WorkoutNavbar/WorkoutNavbar';
import DropdownMenu from '../components/DropdownMenu/DropdownMenu';
import ErrorSplash from '../components/ErrorSplash/ErrorSplash';
import WorkoutsDisplay from '../components/WorkoutsDisplay/WorkoutsDisplay';
import WorkoutCreator from '../components/WorkoutCreator/WorkoutCreator';

import '../scss/workouts.scss';
import '../scss/styles.scss';
import Router from 'next/router';
// map workouts to an object in local state, so I can add/remove from specific
// key rather than iterating through all.

const Workouts = (/*{ workouts }*/) => {

  const [userWorkouts, setUserWorkouts] = useState([]/*workouts*/);
  const [currentDisplay, setCurrentDisplay] = useState('landing');
  const [editingWorkout, setEditingWorkout] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  // useEffect(() => {
  //   console.log('{USE EFFECT} USER WORKOUTS: ', userWorkouts);
  //   console.log('{USE EFFECT} CURRENT DISPLAY: ', currentDisplay);
  // }, [userWorkouts, currentDisplay]);

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
  //   setMyWorkouts(myWorkouts => [...myWorkouts, addOn]);
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
          <button className="workout-landing-button" onClick={() => setCurrentDisplay('create workout')} >Create Workout</button>
          <button className="workout-landing-button" onClick={() => setCurrentDisplay('browse workouts')} >Browse Workouts</button>
        </div>
      );
    }

    if(currentDisplay === 'create workout'){
      return(
        <WorkoutCreator
          passError={passError}
          setUserWorkouts={setUserWorkouts}
          userWorkouts={userWorkouts}
        />
      );
    }

    if(currentDisplay === 'browse workouts'){
      return(
        <WorkoutsDisplay
          passError={passError}
          setUserWorkouts={setUserWorkouts}
          userWorkouts={userWorkouts}
          setEditingWorkout={setEditingWorkout}
          editingWorkout={editingWorkout}
        />
      );
    }
  };

  useEffect(() => {
    axios.get('/workouts/myWorkouts')
    .then(res => {
      if(res.data.isAuthenticated){
        console.log('{DISPLAYWORKOUTPAGE} RES.DATA: ', res.data);
        setIsAuthenticated(true);
        setUserWorkouts(res.data.workouts);
      } else {
        console.log('{DISPLAYWORKOUTPAGE} NO USER');
        Router.push('/');
      }
    });
  }, [isAuthenticated]);

  const displayWorkoutPage = () => {


    if(isAuthenticated){
      return(
        <div className="workouts-container">
          <WorkoutNavbar />

          <div className="workout-banner">
            <h2>Workouts:</h2>

            <DropdownMenu 
              currentDisplay={currentDisplay}
              setCurrentDisplay={setCurrentDisplay}
              setEditingWorkout={setEditingWorkout}
              icon={<i className="fas fa-dumbbell"></i>}
            />
          </div>
        
          {/*<ErrorSplash error={error} />*/}

          {handleDisplay()}

        </div>
      );
    } else {
      return null;
    }
  };


  return(
    displayWorkoutPage()
  );
};

// Workouts.getInitialProps = async ({req}) => {
//   console.log('{WORKOUTS PAGE} GET INITIAL PROPS REQ:'/*, req*/);
//   const res = await axios.get('/workouts/myWorkouts');
//   console.log('{WORKOUTS PAGE} GET INITIAL PROPS RES:'/*, res*/);
//   const data = await res.data;
//   console.log('{WORKOUTS PAGE} GET INITIAL PROPS DATA:'/*, data*/);
//   return { workouts: data };
// };

export default Workouts;
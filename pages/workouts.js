import { useState, useEffect } from 'react';
import axios from 'axios';

import WorkoutNavbar from '../components/WorkoutNavbar/WorkoutNavbar';
import DropdownMenu from '../components/DropdownMenu/DropdownMenu';
import WorkoutsDisplay from '../components/WorkoutsDisplay/WorkoutsDisplay';
import WorkoutCreator from '../components/WorkoutCreator/WorkoutCreator';

import '../scss/workouts.scss';
import '../scss/styles.scss';
import Router from 'next/router';

const Workouts = () => {

  const [userWorkouts, setUserWorkouts] = useState([]);
  const [currentDisplay, setCurrentDisplay] = useState('landing');
  const [editingWorkout, setEditingWorkout] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const [error, setError] = useState('');
  
  // const passError = (newError) => {
  //   setError(newError);
  // };

  // const PageComponent = ... return(
  // <ChildComponent passError={passError} /> )

  // called in ChildComponent:
  // const ChildComponent = ({ passError }) => {  
  // passError('error string goes here') };

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
          setUserWorkouts={setUserWorkouts}
          userWorkouts={userWorkouts}
        />
      );
    }

    if(currentDisplay === 'browse workouts'){
      return(
        <WorkoutsDisplay
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
        setIsAuthenticated(true);
        setUserWorkouts(res.data.workouts);
      } else {
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

export default Workouts;
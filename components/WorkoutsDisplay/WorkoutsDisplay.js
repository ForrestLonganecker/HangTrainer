import { useState, useEffect } from 'react';
import axios from 'axios';

import WorkoutEditor from '../WorkoutEditor/WorkoutEditor';

import './WorkoutDisplay.scss';
//  <WorkoutDisplay passError={passError} workouts={workouts} />

const WorkoutsDisplay = ({ passError, setUserWorkouts, userWorkouts }) => {

  const [editingWorkout, setEditingWorkout] = useState({});


  const handleDisplay = () => {
    console.log('{WORKOUT DISPLAY} USER WORKOUTS PRE MAP: ', userWorkouts);
    const workoutList = userWorkouts.map((workout) =>
      <li className="workout-list-item" key={workout.id}>
        <h4 className="workout-name">{workout.name}</h4>
        <div className="list-item-button-container">
          <button className="list-item-button" onClick={e => handleDeleteWorkout(e, workout.id)}>Delete</button>
          <button className="list-item-button" onClick={() => setEditingWorkout(editingWorkout => { return {...editingWorkout, ...workout}; })}>Edit</button>
        </div>
      </li>
    );

    console.log('{WORKOUTS DISPLAY} HANDLE-DISPLAY EDITINGWORKOUT: ', editingWorkout);

    if(editingWorkout.id){
      console.log('{WORKOUT DISPLAY} IF EDITING WORKOUT: ', editingWorkout);
      return(
        <WorkoutEditor
          editingWorkout={editingWorkout}
          setEditingWorkout={setEditingWorkout}
          passError={passError}
          userWorkouts={userWorkouts}
          setUserWorkouts={setUserWorkouts}
        />
      );
    }
    if(!editingWorkout.id){
      console.log('{WORKOUT DISPLAY} NO EDITING WORKOUT: ', editingWorkout);
      return(
        <ul className="workout-list">
          {workoutList}
        </ul>
      );
    }
  };

  const handleDeleteWorkout = (e, key) => {
    e.preventDefault();

    let data = {
      key: key
    };

    axios.post('/workouts/delete', data)
    .then((res) => {
      if(res.data.statusCode == 400){
        console.log('{WORKOUTS PAGE} DELETE ERR RES.DATA: ', res.data);
        // passes error to the /page/workouts
        passError('Error deleting workout');
      } else {
        console.log('{WORKOUTS PAGE} DELETE BEFORE UPDATE: ', userWorkouts);
        let updatedWorkouts = userWorkouts.filter(workout => workout.id != res.data.id);
        console.log('{WORKOUTS PAGE} DELETE SUCCESS UPDATED WORKOUTS: ', updatedWorkouts);
        setUserWorkouts(updatedWorkouts);
        console.log('{WORKOUTS PAGE} DELETE AFTER UPDATE: ', userWorkouts);
      }
    })
    .catch((err) =>{
      console.log('{WORKOUT PAGE} CATCH ERR ON DELETE: ', err);
      passError('Error deleting workout');
    });
  };

  return (
    handleDisplay()
  );
};

export default WorkoutsDisplay;
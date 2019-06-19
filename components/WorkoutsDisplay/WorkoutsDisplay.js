import { useState } from 'react';
import axios from 'axios';

import WorkoutEditor from '../WorkoutEditor/WorkoutEditor';

//  <WorkoutDisplay passError={passError} workouts={workouts} />

const WorkoutsDisplay = ({ passError, workouts }) => {

  // add workout editor as child component of workoutdisplay
  const [editingWorkout, setEditingWorkout] = useState({});

  const resetEditingWorkout = (e) => {
    e.preventDefault();
    setEditingWorkout({});
  };

  const handleDisplay = () => {
    const workoutList = workouts.map((workout) =>
      <li key={workout.id}>
        <h4>{workout.name}</h4>
        <p>{workout.notes}</p>
        <button onClick={e => handleDeleteWorkout(e, workout.id)}>Delete</button>
        <button onClick={() => setEditingWorkout(editingWorkout => { return {...editingWorkout, ...workout}; })}>Edit</button>
      </li>
    );

    console.log('{WORKOUTS DISPLAY} HANDLE-DISPLAY EDITINGWORKOUT: ', editingWorkout);

    if(editingWorkout.id){
      console.log('{WORKOUT DISPLAY} IF EDITING WORKOUT: ', editingWorkout);
      return(
        <WorkoutEditor
          editingWorkout={editingWorkout}
          resetEditingWorkout={resetEditingWorkout}
          passError={passError}
          workouts={workouts}
        />
      );
    }
    if(!editingWorkout.id){
      console.log('{WORKOUT DISPLAY} NO EDITING WORKOUT: ', editingWorkout);
      return(
        <ul>
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
        console.log('{WORKOUTS PAGE} DELETE SUCCESS RES.DATA.ID: ', res.data.id);
        let updatedWorkouts = [];
        workouts.forEach(workout => {
          console.log(workout.id, res.data.id);
          if(workout.id != res.data.id) updatedWorkouts.push(workout);
        });
        console.log('{WORKOUTS PAGE} DELETE SUCCESS UPDATED WORKOUTS: ', updatedWorkouts);
        workouts = updatedWorkouts;
        console.log('{WORKOUTS PAGE} DELETE SUCCESS WORKOUTS: ', workouts);
        // need to trigger re-render of workoutlist when successful
        // similar to create workout
      }
    })
    .catch((err) =>{
      console.log('{WORKOUT PAGE} CATCH ERR ON DELETE: ', err);
      passError('Error deleting workout');
    });
  };

  return (
    <div>
    {handleDisplay()}
    </div>
  );
};

export default WorkoutsDisplay;
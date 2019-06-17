import { useState } from 'react';
import axios from 'axios';

//  <WorkoutDisplay displayWorkoutsCallback={displayWorkoutsCallback} workouts={workouts} />

const WorkoutsDisplay = ({ displayWorkoutsCallback, workouts }) => {
  const [displayWorkouts, setDisplayWorkouts] = useState(false);

  const displayWorkoutList = () => {
    // myWorkouts not causing rerender, can be replaced with 'workouts'
    const workoutList = workouts.map((workout) =>
      <li key={workout.id}>
        <h4>{workout.name}</h4>
        <p>{workout.notes}</p>
        <button onClick={e => handleDeleteWorkout(e, workout.id)}>Delete</button>
      </li>
    );

    return(
      <ul>
        {workoutList}
      </ul>
    );
  };

  const handleDeleteWorkout = (e, key) => {
    e.preventDefault();

    let data = {
      key: key
    };

    axios.post('/workouts/delete', data)
    .then((res) => {
      if(res.data.statusCode == 400){
        // need to figure out how I want to make a callback work to update the error 
        // setError('Error deleting workout');
        // handleDisplayError();
        console.log('{WORKOUTS PAGE} DELETE ERR RES.DATA: ', res.data);
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
      // need to figure out how I want to make a callback work to update the error 
      // setError('Error deleting workout');
      // handleDisplayError();
    });
  };

  const handleDisplayWorkouts = () => {
    if(displayWorkouts){
      return(
        displayWorkoutList()
      );
    }
  };

  const displayButtonText = () => {
    return displayWorkouts ? 'Collapse workouts' : 'Show workouts';
  };

  const toggleDisplayWorkouts = (e) => {
    e.preventDefault();

    setDisplayWorkouts(!displayWorkouts);
  };

  return (
    <div>
    {displayWorkoutsCallback}
    <button onClick={e => toggleDisplayWorkouts(e)} >{ displayButtonText() }</button>
    {handleDisplayWorkouts()}
    </div>
  );
};

export default WorkoutsDisplay;
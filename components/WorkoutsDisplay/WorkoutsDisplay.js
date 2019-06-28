import { useState } from 'react';
import axios from 'axios';

import WorkoutEditor from '../WorkoutEditor/WorkoutEditor';

import './WorkoutDisplay.scss';

const WorkoutsDisplay = ({ setUserWorkouts, userWorkouts }) => {

  const [editingWorkout, setEditingWorkout] = useState({});

  const handleDisplay = () => {

    const workoutList = userWorkouts.map((workout) => {
      return (
        <li className="workout-list-item" key={workout.id}>
          <h4 className="workout-name">{workout.name}</h4>
          <div className="list-item-button-container">
            <button className="list-item-button" onClick={e => handleDeleteWorkout(e, workout.id)}>Delete</button>
            <button className="list-item-button" onClick={() => setEditingWorkout(editingWorkout => { return {...editingWorkout, ...workout}; })}>Edit</button>
          </div>
        </li>
      );
    });


    if(editingWorkout.id){
      return(
        <WorkoutEditor
          editingWorkout={editingWorkout}
          setEditingWorkout={setEditingWorkout}
          userWorkouts={userWorkouts}
          setUserWorkouts={setUserWorkouts}
        />
      );
    }
    if(!editingWorkout.id){
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
        alert('Error deleting workout');
      } else {
        // updates local state upon success
        let updatedWorkouts = userWorkouts.filter(workout => workout.id != res.data.id);
        setUserWorkouts(updatedWorkouts);
      }
    })
    .catch((err) =>{
      alert('Error while submiting delete workout');
    });
  };

  return (
    handleDisplay()
  );
};

export default WorkoutsDisplay;
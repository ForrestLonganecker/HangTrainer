import axios from 'axios';
import { useState } from 'react';

// <WorkoutEditor editingWorkout={editingWorkout} passError={passError} />

const WorkoutEditor = ({ editingWorkout, setEditingWorkout, passError, setUserWorkouts, userWorkouts }) => {

  const [editName, setEditName] = useState('');
  const [editNotes, setEditNotes] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    
    if(!editName){
      setEditName(editingWorkout.name);
    }

    let data = {
      updatedName: editName,
      updatedNotes: editNotes,
      workoutId: editingWorkout.id
    };

    console.log('{WORKOUT EDITOR} EDIT SUBMIT DATA: ', data);

    if(editName){
      axios.post('/workouts/update', data)
      .then((res) => {
        if(res.data.statusCode == 400){
          passError('Error while updating workout');
        } else {
          console.log('{WORKOUTS UPDATE} ELSE SUCCESS: ', res.data);
          // issue when submitting update on success it crashes front end
          let updatedWorkouts = userWorkouts.map(workout => {
            console.log('{UPDATEDWORKOUT.MAP} WORKOUT: ', workout);
            if(workout.id === editingWorkout.id) {
              console.log('{IF ID === ID} WORKOUT: ', workout);
              return workout = {...workout, name: editName, notes: editNotes};
            } else {
              return workout;
            }
          });
          console.log('{WORKOUTS UPDATE} BEFORE UPDATE: ', userWorkouts);
          console.log('{WORKOUTS UPDATE} UPDATED WORKOUTS: ', updatedWorkouts);
          setUserWorkouts(updatedWorkouts);
          console.log('{WORKOUTS UPDATE} AFTER UPDATE: ', userWorkouts);

          setEditName('');
          setEditNotes('');
          setEditingWorkout({});
        }
      })
      .catch((err) => {
        console.log('{WORKOUTS UPDATE} CATCH ERR: ', err);
        passError('Error while submitting workout update');
      });
    } else {
      passError('Error: workout must contain name');
    }
  };

  const displayEditWorkout = () => {

    let currentWorkoutName = editingWorkout.name;
    return(
      <form onSubmit={handleUpdate} htmlFor="Update workout form">
        <h4>Edit: {currentWorkoutName}</h4>
        <input type="text" onChange={e => setEditName(e.target.value)} defaultValue={editingWorkout.name} />
        <input type="text" onChange={e => setEditNotes(e.target.value)} defaultValue={editingWorkout.notes} />
        <input type="submit" value="Update workout" />
      </form>
    );
  };

  return(
    displayEditWorkout()
  );
};

export default WorkoutEditor;
import axios from 'axios';
import { useState } from 'react';

// <WorkoutEditor editingWorkout={editingWorkout} passError={passError} />

const WorkoutEditor = ({ editingWorkout, passError }) => {

  const [editName, setEditName] = useState('');
  const [editNotes, setEditNotes] = useState('');

  // if(editingWorkout){
  //   setEditName(editingWorkout.name);
  //   setEditNotes(editingWorkout.notes);
  // }

  const handleUpdate = (e) => {
    e.preventDefault();

    let data = {
      name: editName,
      notes: editNotes,
      workoutId: editingWorkout.id
    };

    if(editName){
      axios.post('/workouts/update', data)
      .then((res) => {
        if(res.data.statusCode == 400){
          passError('Error while updating workout');
        } else {
          console.log('{WORKOUTS UPDATE} ELSE SUCCESS: ', res.data);
          // need to figure out how to cause rerender of workoutDisplay component
          setEditName('');
          setEditNotes('');
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

  const displayEditWorkout = (e, editingWorkout) => {
    
    if(editingWorkout){
      e.preventDefault();

      setEditName(editingWorkout.name);
      setEditNotes(editingWorkout.notes);

      let currentWorkoutName = editingWorkout.name;
      return(
        <form onSubmit={handleUpdate} htmlFor="Update workout form">
          <h4>Edit: {currentWorkoutName}</h4>
          <input type="text" onChange={e => setEditName(e.target.value)} value={editingWorkout.name} />
          <input type="text" onChange={e => setEditNotes(e.target.value)} value={editingWorkout.name} />
          <input type="submit" value="Update workout" />
        </form>
      );
    } else {
      return(
        <div><style jsx>{`div { display: none; }`}</style></div>
      );
    }
  };

  return(
    displayEditWorkout()
  );
};

export default WorkoutEditor;
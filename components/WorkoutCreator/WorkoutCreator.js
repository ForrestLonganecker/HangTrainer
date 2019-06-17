import { useState } from 'react';
import axios from 'axios';

const WorkoutCreator = (props) => {




  const handleCreateWorkout = (e) => {
    e.preventDefault();
  
    let data = {
      name: newWorkoutName,
      notes: newWorkoutNotes
    };
  
    if(newWorkoutName){
      axios.post('/workouts/create', data)
      .then((res) => {
        if(res.data.statusCode == 400){
          setError('ERROR: something went wrong, please try again');
          handleDisplayError();
        } else {
          // addToState(res.data);
          console.log("{WORKOUTS PAGE} CREATE WORKOUTS SUCCESS WORKOUTS: ", typeof workouts)
          workouts = workouts.push(res.data);
          console.log("{WORKOUTS PAGE} CREATE WORKOUTS SUCCESS WORKOUTS: ", typeof workouts)
          // reset create form fields
          setNewWorkoutName('');
          setNewWorkoutNotes('');
        };
      })
      .catch((err) => {
        console.log("{WORKOUTS CREATE} CATCH ERR: ", err)
        setError('ERROR: something went wrong, please try again');
        handleDisplayError();
      });
    } else {
      setError('ERROR: workout must contain name');
      handleDisplayError();
    }
  };
  
  const displayCreateWorkout = () => {
    if(displayCreator){
      return(
        <section>
          <label>Create a new workout</label>
          <form onSubmit={handleCreateWorkout} htmlFor="create workout form">
            <section>
              <label htmlFor="name">Workout name:</label>
              <input type="text" value={newWorkoutName} onChange={e => setNewWorkoutName(e.target.value)} />
            </section>
            <section>
              <label htmlFor="notes">Workout notes:</label>
              <input type="text" value={newWorkoutNotes} onChange={e => setNewWorkoutNotes(e.target.value)} />
            </section>
            <input type="submit" value="Create workout" />
          </form>
        </section>
      );
    }
  };
};

export default WorkoutCreator;

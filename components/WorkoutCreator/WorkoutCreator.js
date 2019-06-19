import { useState } from 'react';
import axios from 'axios';

// <WorkoutCreator passError={passError} workouts={workouts} />

const WorkoutCreator = ({ passError, workouts }) => {

  // const [displayCreator, setDisplayCreator] = useState(true);
  const [newWorkoutName, setNewWorkoutName] = useState('');
  const [newWorkoutNotes, setNewWorkoutNotes] = useState('');


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
          // pass error to /page
          passError('Error while creating a workout');
        } else {
          console.log("{WORKOUTS PAGE} CREATE WORKOUTS SUCCESS WORKOUTS: ", typeof workouts, workouts);
          workouts = workouts.push(res.data);
          console.log("{WORKOUTS PAGE} CREATE WORKOUTS SUCCESS WORKOUTS: ", typeof workouts, workouts);
          // reset create form fields
          setNewWorkoutName('');
          setNewWorkoutNotes('');
        }
      })
      .catch((err) => {
        console.log("{WORKOUTS CREATE} CATCH ERR: ", err);
        passError('Error while submitting workout create');
      });
    } else {
      passError('Error: workout must contain name');
    }
  };

  const displayCreateWorkout = () => {
    // if(displayCreator){
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
    // }
  };

  // const displayCreateButton = () => {
  //   return displayCreator ? 'Close workout creator' : 'Open workout creator';
  // };

  // const toggleDisplayCreator = (e) => {
  //   e.preventDefault();

  //   setDisplayCreator(!displayCreator);
  // };

  // <button onClick={e => toggleDisplayCreator(e)} >{ displayCreateButton() }</button>
  return(
    <div>
      {displayCreateWorkout()}
    </div>
  );
};

export default WorkoutCreator;

import { useState } from 'react';
import axios from 'axios';

import './WorkoutCreator.scss';

// <WorkoutCreator passError={passError} workouts={workouts} />

const WorkoutCreator = ({ /*passError,*/ setUserWorkouts, userWorkouts }) => {

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
          // passError('Error while creating a workout');
          alert('Error while creating a workout');
        } else {
          setUserWorkouts(userWorkouts => [...userWorkouts, res.data]);
          // console.log("{WORKOUTS PAGE} CREATE WORKOUTS SUCCESS WORKOUTS: ", typeof userWorkouts, userWorkouts);
          // reset create form fields
          setNewWorkoutName('');
          setNewWorkoutNotes('');
        }
      })
      .catch((err) => {
        console.log("{WORKOUTS CREATE} CATCH ERR: ", err);
        // passError('Error while submitting workout create');
        alert('Error while submitting workout create form');
      });
    } else {
      // passError('Error: workout must contain name');
      alert('Workout must contain name');
    }
  };

  const displayCreateWorkout = () => {
    return(
      <section className="workout-create-container">

        <div className="hand-hold-container">
          <label className="hang-label">Hangs:</label>
          <div className="hang-form-key">
            <p className="rep-number">#</p>
            <p className="position">position</p>
            <p className="grip-type">type</p>
            <p className="weight-added">weight</p>
          </div>
          <ul className="hold-scroll-container" onClick={() => alert("This feature is comming soon!")}>
            <li className="hold-selection">
              <p>1</p>
              <p>IMR</p>
              <p>20mm</p>
              <p>20lbs</p>
            </li>
            <li className="hold-selection">
              <p>2</p>
              <p>MR</p>
              <p>30mm</p>
              <p>0lbs</p>
            </li>
            <li className="hold-selection">
              <p>3</p>
              <p>4F</p>
              <p>10mm</p>
              <p>25lbs</p>
            </li>
            <li className="hold-selection">
              <p>4</p>
              <p>Jug</p>
              <p>30mm</p>
              <p>900lbs</p>
            </li>
          </ul>
        </div>
        <form className="workout-create-form" onSubmit={handleCreateWorkout} htmlFor="create workout form">
          <div className="create-name-container">
            <input className="name-input" type="text" value={newWorkoutName} onChange={e => setNewWorkoutName(e.target.value)} placeholder="Workout name"/>
          </div>
          <textarea type="text" value={newWorkoutNotes} onChange={e => setNewWorkoutNotes(e.target.value)} placeholder="Workout notes"/>
          <button type="submit" >Create workout</button>
        </form>
      </section>
    );
  };

  return(
    displayCreateWorkout()
  );
};

export default WorkoutCreator;

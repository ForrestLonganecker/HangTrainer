import axios from 'axios';
import { useState } from 'react';

import './WorkoutEditor.scss';

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

    return(
      <section className="workout-edit-container">
        <h4 className="edit-header">Edit: {editingWorkout.name}</h4>

        <div className="hand-hold-container">
          <label className="hang-label">Hangs:</label>
          <div className="hang-form-key">
            <p className="rep-number">#</p>
            <p className="position">position</p>
            <p className="grip-type">type</p>
            <p className="weight-added">weight</p>
          </div>
          <ul className="hold-scroll-container">
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
        <form className="workout-edit-form" onSubmit={handleUpdate} htmlFor="update workout form">
          <div className="edit-name-container">
            <input className="name-input" type="text" onChange={e => setEditName(e.target.value)} defaultValue={editingWorkout.name}/>
          </div>
          <textarea type="text" onChange={e => setEditNotes(e.target.value)} defaultValue={editingWorkout.notes}/>
          <div className="form-buttons">
            <button className="cancel-edit-button" onClick={() => setEditingWorkout({})} >Cancel</button>
            <button className="submit-edit-button" type="submit" >Update workout</button>
          </div>
        </form>
      </section>



    );
  };

  return(
    displayEditWorkout()
  );
};

export default WorkoutEditor;
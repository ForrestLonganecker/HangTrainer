import { useState } from 'react';
import axios from 'axios';

import Navbar from '../components/Navbar/Navbar';
import ErrorSplash from '../components/ErrorSplash/ErrorSplash';
import WorkoutsDisplay from '../components/WorkoutsDisplay/WorkoutsDisplay';
import WorkoutCreator from '../components/WorkoutCreator/WorkoutCreator';

// map workouts to an object in local state, so I can add/remove from specific
// key rather than iterating through all.




const Workouts = ({ workouts }) => {

  // need errorCallback from children components such as displayWorkouts

  const [error, setError] = useState('');
  // const [displayCreator, setDisplayCreator] = useState(true);
  // const [newWorkoutName, setNewWorkoutName] = useState('');
  // const [newWorkoutNotes, setNewWorkoutNotes] = useState('');

  // const addToState = (addOn) => {
  //   // how to add items to state that is an array, [...stateArray, addItem]
  //   setMyWorkouts([...myWorkouts, addOn]);
  // }

  const passError = (newError) => {
    setError(newError);
  };

  // const handleCreateWorkout = (e) => {
  //   e.preventDefault();

  //   let data = {
  //     name: newWorkoutName,
  //     notes: newWorkoutNotes
  //   };

  //   if(newWorkoutName){
  //     axios.post('/workouts/create', data)
  //     .then((res) => {
  //       if(res.data.statusCode == 400){
  //         setError('ERROR: something went wrong, please try again');
  //         // handleDisplayError();
  //       } else {
  //         // addToState(res.data);
  //         console.log("{WORKOUTS PAGE} CREATE WORKOUTS SUCCESS WORKOUTS: ", typeof workouts, workouts);
  //         workouts = workouts.push(res.data);
  //         console.log("{WORKOUTS PAGE} CREATE WORKOUTS SUCCESS WORKOUTS: ", typeof workouts, workouts);
  //         // reset create form fields
  //         setNewWorkoutName('');
  //         setNewWorkoutNotes('');
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("{WORKOUTS CREATE} CATCH ERR: ", err);
  //       setError('ERROR: something went wrong, please try again');
  //       // handleDisplayError();
  //     });
  //   } else {
  //     setError('ERROR: workout must contain name');
  //     // handleDisplayError();
  //   }
  // };

  // const displayCreateWorkout = () => {
  //   if(displayCreator){
  //     return(
  //       <section>
  //         <label>Create a new workout</label>
  //         <form onSubmit={handleCreateWorkout} htmlFor="create workout form">
  //           <section>
  //             <label htmlFor="name">Workout name:</label>
  //             <input type="text" value={newWorkoutName} onChange={e => setNewWorkoutName(e.target.value)} />
  //           </section>
  //           <section>
  //             <label htmlFor="notes">Workout notes:</label>
  //             <input type="text" value={newWorkoutNotes} onChange={e => setNewWorkoutNotes(e.target.value)} />
  //           </section>
  //           <input type="submit" value="Create workout" />
  //         </form>
  //       </section>
  //     );
  //   }
  // };

  // const displayCreateButton = () => {
  //   return displayCreator ? 'Close workout creator' : 'Open workout creator';
  // };

  // const toggleDisplayCreator = (e) => {
  //   e.preventDefault();

  //   setDisplayCreator(!displayCreator);
  // };

  return (
    <div>
      <h1>HangTrainer</h1>
      <Navbar />
      <h2>Workouts:</h2>

      <ErrorSplash error={error} />

      <WorkoutCreator 
        passError={passError}
        workouts={workouts}
      />

      <WorkoutsDisplay
        passError={passError}
        workouts={workouts}
      />
{/*
      <button onClick={e => toggleDisplayCreator(e)} >{ displayCreateButton() }</button>
      {displayCreateWorkout()}
*/}
    </div>
  );
};

Workouts.getInitialProps = async ({req}) => {
  console.log('{WORKOUTS PAGE} GET INITIAL PROPS REQ:', req);
  const res = await axios.get('/workouts/myWorkouts');
  console.log('{WORKOUTS PAGE} GET INITIAL PROPS RES:', res);
  const data = await res.data;
  console.log('{WORKOUTS PAGE} GET INITIAL PROPS DATA:', data);
  return { workouts: data };
};

export default Workouts;
import { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';

const Workouts = () => {

  const [error, setError] = useState('');
  const [displayWorkouts, setDisplayWorkouts] = useState(false);
  const [displayCreator, setDisplayCreator] = useState(true);
  const [newWorkoutName, setNewWorkoutName] = useState('');
  const [newWorkoutNotes, setNewWorkoutNotes] = useState('');
  const [myWorkouts, setMyWorkouts] = useState([]);

  const addToState = (addOn) => {
    setMyWorkouts([...myWorkouts, addOn]);
    handleDisplayWorkouts();
    displayWorkoutList();
  }

  const handleCreateWorkout = (e) => {
    e.preventDefault();
    console.log('{WORKOUT PAGE} NEWWORKOUTINFO', newWorkoutName, newWorkoutNotes);

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
          console.log('{WORKOUT PAGE} SUCCESS RES.DATA: ', res.data);
          console.log('{WORKOUT PAGE} SUCCESS myWorkouts: ', myWorkouts);
          addToState(res.data);
          setNewWorkoutName('');
          setNewWorkoutNotes('');
        }
      })
      .catch((err) => {
        console.log('{WORKOUT PAGE} ERR: ', err);
        setError('ERROR: something went wrong, please try again');
        handleDisplayError();
      })
    } else {
      setError('ERROR: workout must contain name');
      handleDisplayError();
    }
  }

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
  }

  const displayCreateButton = () => {
    return displayCreator ? 'Close workout creator' : 'Open workout creator';
  }

  const toggleDisplayCreator = (e) => {
    e.preventDefault();

    setDisplayCreator(!displayCreator);
  }

  const displayWorkoutList = () => {
    if(myWorkouts){

      let workoutList = myWorkouts.map((workout, key) => {
        <li key={workout.id}>
          <h4>{workout.name}</h4>
          <h3>{workout.notes}</h3>
        </li>
      });

      return(
        <ul>
          {workoutList}
        </ul>
      );
    };
  };

  const handleDisplayWorkouts = () => {
    if(displayWorkouts){
      console.log('{DISPLAY-WORKOUTS} IF DISPLAYWORKOUTS: ', myWorkouts)
      return(
        displayWorkoutList()
      );
    }
  }

  const displayWorkoutsButton = () => {
    return displayWorkouts ? 'Collapse workouts' : 'Show workouts';
  }

  const toggleDisplayWorkouts = (e) => {
    e.preventDefault();

    setDisplayWorkouts(!displayWorkouts);
  }

  const handleDisplayError = () => {
    if(error){
      return(
        <section className="error">{error}
        <style jsx>{`
        .error {
          background-color: red;
          color: white;
        } 
        `}</style>
        </section>

      )
    }
  }

  return (
    <div>
      <h1>HangTrainer</h1>
      <Navbar />
      <h2>Workouts:</h2>

      {handleDisplayError()}

      <button onClick={e => toggleDisplayWorkouts(e)} >{ displayWorkoutsButton() }</button>
      {handleDisplayWorkouts()}

      <button onClick={e => toggleDisplayCreator(e)} >{ displayCreateButton() }</button>
      {displayCreateWorkout()}

    </div>
  );
}

export default Workouts;
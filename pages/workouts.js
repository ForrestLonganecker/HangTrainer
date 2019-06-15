import { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';


// next: create a getAllOwn call with axios to populate a state variable with,
// then: map those variable out in a list that is viewable




const Workouts = ({ workouts }) => {

  const [error, setError] = useState('');
  const [displayWorkouts, setDisplayWorkouts] = useState(false);
  const [displayCreator, setDisplayCreator] = useState(true);
  const [newWorkoutName, setNewWorkoutName] = useState('');
  const [newWorkoutNotes, setNewWorkoutNotes] = useState('');
  // const [myWorkouts, setMyWorkouts] = useState([]);

  // const addToState = (addOn) => {
  //   // how to add items to state that is an array, [...stateArray, addItem]
  //   setMyWorkouts([...myWorkouts, addOn]);
  // }

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
          // reset create form fields
          setNewWorkoutName('');
          setNewWorkoutNotes('');
        }
      })
      .catch((err) => {
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
    const workoutList = workouts.map((workout, key) =>
      <li key={workout.id}>
        <h4>{workout.name}</h4>
        <h3>{workout.notes}</h3>
      </li>
    );

    return(
      <ul>
        {workoutList}
      </ul>
    );
  };

  const handleDisplayWorkouts = () => {
    if(displayWorkouts){
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

Workouts.getInitialProps = async ({req}) => {
  console.log('{WORKOUTS PAGE} GET INITIAL PROPS REQ:', req)
  const res = await axios.get('/workouts/myWorkouts');
  console.log('{WORKOUTS PAGE} GET INITIAL PROPS RES:', res)
  const data = await res.data;
  console.log('{WORKOUTS PAGE} GET INITIAL PROPS DATA:', data)
  return { workouts: data }
}

export default Workouts;
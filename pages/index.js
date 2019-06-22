import { useState } from 'react';

import SignIn from '../components/SignIn/SignIn';
import SignUp from '../components/SignUp/SignUp';

import '../scss/styles.scss';

// need to make a layout that allows for me to put error message component in
// the right spot

const Index = () => {

  const [currentDisplay, setCurrentDisplay] = useState('sign in');

  const handleDisplay = () => {
    if(currentDisplay === 'sign in'){
      return(
        <SignIn  setCurrentDisplay={setCurrentDisplay} />
      );
    }
    
    if(currentDisplay === 'sign up') {
      return(
        <SignUp setCurrentDisplay={setCurrentDisplay} />
      );
    }
  };

  return(
    handleDisplay()
  );
};

export default Index;
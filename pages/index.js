import Navbar from '../components/Navbar/Navbar';
// import Landing from '../components/Landing/Landing';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

// importing app level SCSS
import '../scss/styles.scss';


const Index = () => {
  const [currentUser, setCurrentUser] = useState(false);

  const displayLanding = () => {
    axios.get('http://localhost:3000/static/index')
    .then(res => {
      console.log('{INDEX.JS} RES: ', res)
      if(res.data == 'USER SIGNED IN'){
        setCurrentUser(true);
      } else {
        setCurrentUser(false);
      }
    });
    // return <Landing currentUser />
    if(currentUser){
      return (
        <section>
          <h1>HangTrainer</h1>
          <img src='/static/BoulderLogo.png' />
          <h2>Current User: {currentUser.toString()}</h2>
          <Navbar />
          <p>Welcome to HangTrainer, Sign up and start tracking your Hangs!</p>
          </section>
          );
    } else {
      return (
        <section>
          <h1>HangTrainer</h1>
          <img src='/static/BoulderLogo.png'  />
          <p>Welcome to HangTrainer, Sign up and start tracking your Hangs!</p>
          <Link href="/signIn">
            <a title="Sign in">Sign in</a>
          </Link>
          <Link href="/signUp">
            <a title="Sign up">Sign up</a>
          </Link>
          <h2>Current User: {currentUser.toString()}</h2>
        </section>
      );
    }
  }

  return (
    displayLanding()  
  );
}


export default Index;


// const Index = (props) => (
//   <section>
//     <h1>HangTrainer</h1>
//     <Navbar />
//     <p>Welcome to HangTrainer, Sign up and start tracking your Hangs!</p>
// {/*    <Link as={`/references/${props.id}`} href={`/reference?title=${props.title}`}>
//       <a title="learn about hang board workouts">Reference: {props.title}</a>
// </Link>*/}
//   </section>
//   );


// // get initial props looking for user info to pass down to navbar for conditional rendering
//   Index.getInitialProps = async (props) => {
//     axios.get('http://localhost:3000/static/index')
//     .then((res) => {
//       console.log('{INDEX.JS} RES.DATA: ', res.data);
//       const userInfo = { user: res.data }; 
//       console.log('{INDEX.JS} USERINFO: ', userInfo);
//       // console.log('{INDEX.JS} PROPS: ', props);
//       // console.log('{INDEX.JS} REQ: ', req);
//       console.log('{INDEX.JS} TYPEOF(USERINFO): ', typeof(userInfo));
//       // possibly returning undefined instead of an object?
//       return { userInfo };
//     })
//   }

//   // can't get dynamic routes to work

//   // Index.getInitialProps = async (props) => {
//   // const title = 'Training Beta';
//   // const id = 'training-beta';

//   // return {
//   //   title,
//   //   id
//   // };
// // };

// export default Index;
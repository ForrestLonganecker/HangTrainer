import Navbar from '../components/Navbar/Navbar';
import Link from 'next/link';

// importing app level SCSS
import '../scss/styles.scss';


const Index = (props) => (
  <section>
    <h1>HangTrainer</h1>
    <Navbar />
    <p>Welcome to HangTrainer, Sign up and start tracking your Hangs!</p>
{/*    <Link as={`/references/${props.id}`} href={`/reference?title=${props.title}`}>
      <a title="learn about hang board workouts">Reference: {props.title}</a>
</Link>*/}
  </section>
  );

  // can't get dynamic routes to work

  // Index.getInitialProps = async (props) => {
  // const title = 'Training Beta';
  // const id = 'training-beta';

  // return {
  //   title,
  //   id
  // };
// };

export default Index;
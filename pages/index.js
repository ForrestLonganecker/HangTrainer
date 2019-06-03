import Navbar from '../components/Navbar/Navbar';
import Link from 'next/link';

// importing app level SCSS
import '../scss/styles.scss';

const Index = (props) => (
  <section>
    <h1>HangTrainer</h1>
    <Navbar />
    <p>Welcome to HangTrainer, Sign up and start tracking your Hangs!</p>
    <Link as={`/references/${props.slug}`} href={`/reference?title=${props.title}`}>
      <a title="learn about hang board workouts">HangBoard references</a>
    </Link>
  </section>
);

Index.getInitialProps = async function(props) {
  let title = 'Training Beta';
  let slug = title.split(" ").join("-");

  return {
    title,
    slug
  };
};

export default Index;
import Navbar from '../components/Navbar/Navbar';

// importing app level SCSS
import '../scss/styles.scss';

const Index = () => (
  <section>
    <Head>
      {/* This could eventually be handy for letting the user know when 
      they are in the workout side of the app or user side*/}
      HangTrainer Landing page
    </Head>
    <h1>HangTrainer</h1>
    <Navbar />
    <p>Welcome to HangTrainer, Sign up and start tracking your Hangs!</p>
  </section>
)

export default Index;
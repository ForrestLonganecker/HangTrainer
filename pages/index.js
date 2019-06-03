import Layout from '../compoonents/MyLayout';
import Link from 'next/link';

const ReferenceLink = props => (
  <li>
    <Link href={`/reference?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
);

export default function Index() {
  return (
    <Layout>
      <h1>HangTrainer</h1>
      <p>Welcome to the Index page!</p>
      <h3>Some useful resources on HangBoard and other Climbing information</h3>
      <ul>
        <ReferenceLink title="Training Beta" url="https://www.trainingbeta.com/"/>
        <ReferenceLink title="Climb Strong" url="https://www.climbstrong.com/"/>
        <ReferenceLink title="Grassroots PT" url="http://www.grassrootsphysicaltherapy.com/"/>
      </ul>
    </Layout>
  );
}



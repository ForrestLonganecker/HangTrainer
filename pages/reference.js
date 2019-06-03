import { withRouter } from 'next/router';
import Layout from '../compoonents/MyLayout';


const Reference = withRouter(props => (
  <Layout>
    <h1>{props.router.query.title}</h1>
    <a>{props.router.query.url}</a>
  </Layout>
));

export default Reference;
// can't get dynamic routes to work

import { withRouter } from 'next/router';

const Reference = withRouter(props => (
  <div>
    <h1>{props.router.query.title}</h1>
    <p>This is static ref material</p>
  </div>
));

export default Reference;
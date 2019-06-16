import React from 'react';
import Layout from '../../components/layout';
import { Link } from 'gatsby';

export default (): JSX.Element => (
   <Layout>
      <h1>Hello from page 3</h1>
      <Link to='/page-2'>Go to page 2</Link>
   </Layout>
);

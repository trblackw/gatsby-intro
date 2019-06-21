import React from 'react';
import Layout from '../../components/layout';
import { Link, graphql, StaticQuery } from 'gatsby';

const getImageData = graphql`
   {
      allFile {
         edges {
            node {
               relativePath
               size
               extension
               birthTime
            }
         }
      }
   }
`;

export default (): JSX.Element => (
   <Layout>
      <h1>Hello from page 3</h1>
      <h3>Image file data</h3>
      <StaticQuery
         query={getImageData}
         render={(data): JSX.Element => (
            <table>
               <thead>
                  <tr>
                     <th>Relative Path</th>
                     <th>Size of getImageData</th>
                     <th>Extension</th>
                     <th>Birth Time</th>
                  </tr>
               </thead>
               <tbody>
                  {data.allFile.edges.map(({ node: { relativePath, size, extension, birthTime } }: any, i: number): JSX.Element => (
                     <tr key={i}>
                        <td>{relativePath}</td>
                        <td>{size}</td>
                        <td>{extension}</td>
                        <td>{birthTime}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         )}
      />
      <Link to='/page-2'>Go to page 2</Link>
   </Layout>
);

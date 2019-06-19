/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { ReactNode, Fragment } from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Header from './header';
import './layout.css';

const GET_SITE_METADATA = graphql`
   {
      site {
         siteMetadata {
            title
            author
         }
      }
   }
`;

const Layout: React.FC<{ children: ReactNode }> = ({ children }): JSX.Element => (
   <StaticQuery
      query={GET_SITE_METADATA}
      render={(data: any): JSX.Element => {
         const { title, author } = data.site.siteMetadata;
         return (
            <Fragment>
               <Header siteTitle={title} />
               <div
                  style={{
                     margin: `0 auto`,
                     maxWidth: 960,
                     padding: `0px 1.0875rem 1.45rem`,
                     paddingTop: 0
                  }}>
                  <main>{children}</main>
                  <footer>
                     © {new Date().getFullYear()}, Built by {author}
                  </footer>
               </div>
            </Fragment>
         );
      }}
   />
);

export default Layout;

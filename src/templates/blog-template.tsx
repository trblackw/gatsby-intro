import React, { Fragment } from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import styled from 'styled-components';

const getMarkdownPosts = graphql`
   {
      allMarkdownRemark {
         totalCount
         edges {
            node {
               fields {
                  slug
               }
               id
               frontmatter {
                  title
                  date
               }
               excerpt
            }
         }
      }
   }
`;

export default (): JSX.Element => (
   <Layout>
      <Container>
         <BlogTitle>Gatsby Blog</BlogTitle>
         <hr />
         <StaticQuery
            query={getMarkdownPosts}
            render={({ allMarkdownRemark }): JSX.Element => (
               <Fragment>
                  <PostCount>{allMarkdownRemark.totalCount} Posts</PostCount>
                  {allMarkdownRemark.edges.map(
                     ({
                        node: { frontmatter, id, excerpt, fields }
                     }: {
                        node: { frontmatter: any; id: string | number; excerpt: string; fields: { slug: string } };
                     }): JSX.Element => (
                        <PostContainer key={id}>
                           <PostTitle>
                              <StyledLink to={`/posts${fields.slug}`}>{frontmatter.title}</StyledLink>
                              <BlogDate>{frontmatter.date}</BlogDate>
                           </PostTitle>
                           <Excerpt>{excerpt}</Excerpt>
                        </PostContainer>
                     )
                  )}
               </Fragment>
            )}
         />
      </Container>
   </Layout>
);

const StyledLink = styled(Link)`
   text-decoration: none;
   color: #5D2392;

   &:hover {
      text-decoration: underline;
   }
`

const Container = styled.div``;

const BlogTitle = styled.h1`display: inline-block;`;
const PostCount = styled.h4``;

const PostContainer = styled.div``;

const PostTitle = styled.h3``;

const BlogDate = styled.span`
   color: #bbb;
   margin-left: 10px;
   font-size: 0.6em;
   font-weight: 400;
`;

const Excerpt = styled.p``;

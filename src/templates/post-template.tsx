import React from 'react';
import Layout from '../components/layout';
import { graphql } from 'gatsby';
import styled from 'styled-components';

const PostTemplate = ({ data: post }: { data: any }): JSX.Element => (
   <Layout>
      <Container>
         <PostTitle>{post.markdownRemark.frontmatter.title}</PostTitle>
         <div dangerouslySetInnerHTML={{ __html: post.markdownRemark.html }}></div>
      </Container>
   </Layout>
);

export const query = graphql`
   query($slug: String!) {
      markdownRemark(fields: { slug: { eq: $slug } }) {
         html
         frontmatter {
            title
         }
      }
   }
`;

export default PostTemplate;

const Container = styled.div`
   margin: 0 auto;
`

const PostTitle = styled.h1`
   font-size: 1.5em;
   font-weight: bolder;
`
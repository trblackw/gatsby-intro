import React from 'react';
import { graphql, Link } from 'gatsby';
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

export default ({ data, pageContext }: { data: any; pageContext: any }): JSX.Element => {
console.log("TCL: data", data)
   const { currentPage, isFirstPage, isLastPage } = pageContext;
   
   const nextPage = `/blog/${String(currentPage + 1)}`;
   const prevPage = currentPage - 1 === 1 ? '/blog' : `/blog/${String(currentPage - 1)}`;
   return (
      <Layout>
         <Container>
            <BlogTitle>Gatsby Blog</BlogTitle>
            <hr />
            <PostCount>{data.allMarkdownRemark.totalCount} Posts</PostCount>
            {data.allMarkdownRemark.edges.map(
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
            <div>
               {!isFirstPage && (
                  <Link to={prevPage} rel='prev'>
                     Prev Page
                  </Link>
               )}
               {!isLastPage && (
                  <Link to={nextPage} rel='next'>
                     Next Page
                  </Link>
               )}
            </div>
         </Container>
      </Layout>
   );
};

export const query = graphql`
   query($skip: Int!, $limit: Int!) {
      allMarkdownRemark(skip: $skip, limit: $limit) {
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
const StyledLink = styled(Link)`
   text-decoration: none;
   color: #5D2392;

   &:hover {
      text-decoration: underline;
   }
`;

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

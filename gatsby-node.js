const { createFilePath } = require('gatsby-source-filesystem');
const path = require('path');
const PostTemplate = path.resolve('./src/templates/post-template.tsx');
const BlogTemplate = path.resolve('./src/templates/blog-template.tsx');

//programmatically generate slugs for posts & their respective pages
const MarkdownRemark = 'MarkdownRemark';
exports.onCreateNode = ({ node, getNode, actions }) => {
   if (node.internal.type === MarkdownRemark) {
      const slug = createFilePath({ node, getNode, basePath: 'posts' });
      actions.createNodeField({
         node,
         name: 'slug',
         value: slug
      });
   }
};

exports.createPages = async ({ graphql, actions }) => {
   const { data } = await graphql(`
      {
         allMarkdownRemark {
            edges {
               node {
                  fields {
                     slug
                  }
               }
            }
         }
      }
   `);
   const posts = data.allMarkdownRemark.edges;
   posts.forEach(({ node: post }) =>
      actions.createPage({
         path: `posts${post.fields.slug}`,
         component: PostTemplate,
         context: {
            slug: post.fields.slug
         }
      })
   );

   posts.forEach((_, i, postsArr) => {
      const totalPages = postsArr.length,
      postsPerPage = 1,
      currentPage = i + 1,
      isFirstPage = i === 0,
      isLastPage = i === totalPages;

      actions.createPage({
         path: isFirstPage ? '/blog' : `/blog${currentPage}`,
         component: BlogTemplate,
         context: {
            limit: postsPerPage,
            skip: i * postsPerPage,
            isFirstPage,
            isLastPage,
            currentPage,
            totalPages
         }
      })
   })
};

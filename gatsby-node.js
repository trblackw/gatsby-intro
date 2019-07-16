const { createFilePath } = require('gatsby-source-filesystem');
const path = require('path');
const PostTemplate = path.resolve('./src/templates/post-template.tsx');

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
   const { data } = await graphql`
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
   `;
   const posts = data.allMarkdownRemark.edges;
   posts.forEach(({ node: post }) =>
      actions.createPage({
         path: `posts${post.field.slug}`,
         component: PostTemplate,
         context: {
            slug: post.fields.slug
         }
      })
   );
};

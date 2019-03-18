var path = require('path')
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// exports.onCreateNode = ({ node }) => {
//   console.log(node.internal)
// }

exports.createPages = async ({graphql, actions}) => {
  // create category pages
  const gq = await graphql(`{
    categories:allContentfulProductCategories(filter: {root: {eq: true}}){
      edges {
        node {
          slug
          childs {
            slug
            childs {
              slug
            }
          }
        }
      }
    }
  }`)
  gq.data.categories.edges.forEach(edge => {
    let context = { slug: edge.node.slug, lv1: edge.node.slug }
    actions.createPage({
      path: context.lv1,
      component: path.resolve(__dirname, 'src/templates/Page.js'),
      context
    })
    edge.node.childs && edge.node.childs.forEach(node => {
      context = { ...context, lv2: node.slug, slug: node.slug }
      actions.createPage({
        path: `${context.lv1}/${context.lv2}`,
        component: path.resolve(__dirname, 'src/templates/Page.js'),
        context
      })
      node.childs && node.childs.map(node => {
        context = { ...context, lv3: node.slug, slug: node.slug }
        actions.createPage({
          path: `${context.lv1}/${context.lv2}/${context.lv3}`,
          component: path.resolve(__dirname, 'src/templates/Page.js'),
          context
        })
      })
    })
  })
}
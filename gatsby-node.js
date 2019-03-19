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
          story
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

  // query story content
  // const storyRequests = await Promise.all(gq.data.categories.edges.map(edge => {
  //   const story = edge.node.story
  //   return Promise.all(story.REQUESTS.map(([id, query]) => Promise.all([id, graphql(query)])))
  // }))

  // create category pages
  gq.data.categories.edges.forEach(edge => {
    let context = { slug: edge.node.slug, lv1: edge.node.slug }
    actions.createPage({
      path: context.lv1,
      component: path.resolve(__dirname, 'src/templates/Page.js'),
      context: {
        ...context, 
        // storyRequests: edge.node.story.COMPONENTS.map(Daki)
      }
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
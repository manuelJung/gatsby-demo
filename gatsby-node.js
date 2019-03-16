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
  const gq = await graphql(`
  {
    rootCategories:allContentfulPage(filter: {root: {eq: true}}){
      edges {
        node {
          slug
        }
      }
    }
  }`)
  let pages_l1 = gq.data.rootCategories.edges.map(edge => ({
    lv1: edge.node.slug
  }))

  let pages_l2 = await Promise.all(pages_l1.map(async page => {
      const response = await graphql(`{
        categories:allContentfulPage(filter: {parents: {elemMatch: {slug: {eq: "${page.lv1}"}}}}) {
          edges {
            node {
              slug
            }
          }
        }
      }`)
      if(!response.data.categories) return null
      return response.data.categories.edges.map(edge => Object.assign({}, page, {
        lv2: edge.node.slug
      }))
  }))

  pages_l2 = pages_l2.reduce((p,n) => {
    if(n) p.push(...n)
    return p
  }, [])

  let pages_l3 = await Promise.all(pages_l2.map(async page => {
      const response = await graphql(`{
        categories:allContentfulPage(filter: {parents: {elemMatch: {slug: {eq: "${page.lv2}"}}}}) {
          edges {
            node {
              slug
            }
          }
        }
      }`)
      if(!response.data.categories) return null
      return response.data.categories.edges.map(edge => Object.assign({}, page, {
        lv3: edge.node.slug
      }))
  }))

  pages_l3 = pages_l3.reduce((p,n) => {
    if(n) p.push(...n)
    return p
  }, [])


  pages_l1.forEach(page => {
    actions.createPage({
      path: page.lv1,
      component: path.resolve(__dirname, 'src/templates/Page.js'),
      context: page
    })
  })

  pages_l2.forEach(page => {
    actions.createPage({
      path: `${page.lv1}/${page.lv2}`,
      component: path.resolve(__dirname, 'src/templates/Page.js'),
      context: page
    })
  })

  pages_l3.forEach(page => {
    actions.createPage({
      path: `${page.lv1}/${page.lv2}/${page.lv3}`,
      component: path.resolve(__dirname, 'src/templates/Page.js'),
      context: page
    })
  })
}
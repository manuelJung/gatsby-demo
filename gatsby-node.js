var path = require('path')
var requestPaths = require('./src/storybook/requests')
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
    pages:allPages {
      nodes {
        title
        objectID
        urlKey
        story
      }
    }
  }`)

  // extract storybook requests
  let requests = {}
  let pending = []
  gq.data.pages.nodes.slice(0,1).forEach(page => {
    const story = JSON.parse(page.story)
    Object.values(story.dict).forEach(component => {
      const path = requestPaths[component.name]
      if(!path) return 
      const request = require(path)
      pending.push([component.id, request(graphql, component.props)])
    })
  })

  const pendingResolved = await Promise.all(pending.map(row => row[1]))
  pendingResolved.forEach((result,i) => {requests[pending[i][0]]=result})

  gq.data.pages.nodes.forEach(page => {
    page.story = JSON.parse(page.story)
    const initialReduxStates = {}
    const storyRequests = {}

    // get requests
    Object.keys(page.story.dict).forEach(id => storyRequests[id] = requests[id])

    actions.createPage({
      path: `page/${page.urlKey}/`,
      component: path.resolve(__dirname, 'src/templates/Page.js'),
      context: { page, initialReduxStates, storyRequests }
    })
  })
}
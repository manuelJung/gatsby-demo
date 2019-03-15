var algoliasearch = require('algoliasearch')
var algoliasearchHelper = require('algoliasearch-helper')
var crypto = require('crypto')

var client = algoliasearch('08VQW969UU', 'bb368529fd7609c7d79f44a58191b35f')


const getHelper = () => {
  var helper = algoliasearchHelper(client, 'static-block', {
    facets: ['identifier']
  })
  return helper
}

exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions
  // Create nodes here, generally by downloading data
  // from a remote API.
  const helper = getHelper()
  const data = await helper.searchOnce()
    .then(result => result.content.hits)
    .then(hits => hits.map(hit => Object.assign({}, hit, {
      id: hit.objectID,
      parent: null, // or null if it's a source node without a parent
      children: [],
      internal: {
        type: `staticBlock`,
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(hit))
          .digest(`hex`),
        // mediaType: `text/markdown`, // optional
        // content: JSON.stringify(fieldData), // optional
        // description: `Cool Service: "Title of entry"`, // optional
      }
    })))

  // Process data into nodes.
  data.forEach(hit => createNode(hit))

  // We're done, return.
  return
}
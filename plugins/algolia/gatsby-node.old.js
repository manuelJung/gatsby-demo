var algoliasearch = require('algoliasearch')
var algoliasearchHelper = require('algoliasearch-helper')
var crypto = require('crypto')
var fetchCategories = require('./categories')


// var client = algoliasearch('08VQW969UU', 'bb368529fd7609c7d79f44a58191b35f')
var client = algoliasearch('0BYMLMXGLI', '7058207f486c5d9c0a0e2d31fd10e7e5')

const fetchHits = index => {
  var helper = algoliasearchHelper(client, index, {
    hitsPerPage: 1000,
    attributesToHighlight: []
  })
  return helper.searchOnce()
    .then(result => result.content.hits)
    .then(hits => hits.map(hit => Object.assign({}, hit, {
      id: hit.objectID,
      parent: null, // or null if it's a source node without a parent
      children: [],
      internal: {
        type: index,
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(hit))
          .digest(`hex`),
        mediaType: `text/markdown`, // optional
        content: JSON.stringify(hit), // optional
        description: `Cool Service: "Title of entry"`, // optional
      }
    })))
}

exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions
  // Create nodes here, generally by downloading data
  // from a remote API.
  await Promise.all([
    fetchHits('pages').then(hits => hits.forEach(hit => createNode(hit))),
    fetchHits('magazine').then(hits => hits.forEach(hit => createNode(hit))),
    fetchHits('navigation').then(hits => hits.forEach(hit => createNode(hit))),
    fetchHits('staticblocks').then(hits => hits.forEach(hit => createNode(hit))),
  ])

  await fetchCategories().then(hits => hits.forEach(hit => createNode(hit)))
}
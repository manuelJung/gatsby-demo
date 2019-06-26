var algoliasearch = require('algoliasearch')
var algoliasearchHelper = require('algoliasearch-helper')
var crypto = require('crypto')
var fetchNavigation = require('./navigation')

function transformStory(story){
  return {
    dict: {
      '123456': {
        name: 'MyComponent',
        id: '123456',
        props: { foo: "bar" }
      }
    },
    grids: {
      MOBILE_M: {
        components: ['123456'],
        css: `
          grid: "MyComponent" auto
              / 1fr;
          grid-gap: 20px;
        `
      }
    }
  }
}


// var client = algoliasearch('08VQW969UU', 'bb368529fd7609c7d79f44a58191b35f')
var client = algoliasearch('0BYMLMXGLI', '7058207f486c5d9c0a0e2d31fd10e7e5')

const fetchHits = index => {
  var helper = algoliasearchHelper(client, index, {
    hitsPerPage: 1000,
    attributesToHighlight: []
  })
  return helper.searchOnce().then(result => result.content.hits)
}

exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions
  // Create nodes here, generally by downloading data
  // from a remote API.
  const [pages, navigation ] = await Promise.all([
    fetchHits('pages'),
    // fetchHits('magazine'),
    // fetchHits('navigation'),
    // fetchHits('staticblocks'),
    fetchNavigation()
  ])

  // create pages
  pages.forEach(page => {
    // story must be json to not be formatted
    page.story = JSON.stringify(transformStory(page.story))

    let meta = {}
    const json = JSON.stringify(page)

    meta.id = page.objectID
    meta.parent = null
    meta.children = []
    meta.internal = {
      type: 'pages',
      contentDigest: crypto.createHash(`md5`).update(json).digest(`hex`),
      mediaType: `application/json`,
      content: json,
      description: `Page (${page.title})` 
    }

    createNode({...page, ...meta})
  })

  navigation.forEach(nav => {
    let meta = {}
    const json = JSON.stringify(nav)

    meta.id = nav.id
    meta.parent = null
    meta.children = []
    meta.internal = {
      type: 'navigation',
      contentDigest: crypto.createHash(`md5`).update(json).digest(`hex`),
      mediaType: `application/json`,
      content: json,
      description: `Navigation (${nav.label})` 
    }

    createNode({...nav, ...meta})
  })
}
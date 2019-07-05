var crypto = require('crypto')
var fetchNavigation = require('./navigation')
var fetchCategories = require('./categories')
var transformStory = require('./utils/transformStory')
var fetchHits = require('./utils/fetchHits')


module.exports = async ({ actions }) => {
  const { createNode } = actions
  // Create nodes here, generally by downloading data
  // from a remote API.
  const [pages, navigation, categories ] = await Promise.all([
    fetchHits('pages'),
    // fetchHits('magazine'),
    // fetchHits('navigation'),
    // fetchHits('staticblocks'),
    fetchNavigation(),
    fetchCategories()
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

  categories.forEach(cat => {
    // resolve conflicts
    cat.useStory = Boolean(cat.useStory)
    cat.useEnhancedStory = Boolean(cat.useEnhancedStory)
    cat.hideProducts = Boolean(cat.hideProducts)
    cat.categoryLevel = cat.categoryLevel || null

    // relations
    cat.parentCategory___NODE = cat.parentId
    cat.childCategories___NODE = cat.childIds


    let meta = {}
    const json = JSON.stringify(cat)
    cat.story = JSON.stringify(transformStory(cat.story))

    meta.id = cat.objectID
    meta.parent = null
    meta.children = []
    meta.internal = {
      type: 'category',
      contentDigest: crypto.createHash(`md5`).update(json).digest(`hex`),
      mediaType: `application/json`,
      content: json,
      description: `Category (${cat.label})` 
    }

    createNode({...cat, ...meta})
  })
}
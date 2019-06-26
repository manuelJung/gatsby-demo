var fetch = require('node-fetch')
var algoliasearch = require('algoliasearch')
var algoliasearchHelper = require('algoliasearch-helper')
var client = algoliasearch('0BYMLMXGLI', '7058207f486c5d9c0a0e2d31fd10e7e5')

const fetchHits = index => {
  var helper = algoliasearchHelper(client, index, {
    hitsPerPage: 1000,
    attributesToHighlight: []
  })
  return helper.searchOnce().then(result => result.content.hits)
}


function createCategories(navItems, navigation) {
  let navigationDict = {}
  for(let nav of navigation) navigationDict[nav.objectID] = nav
  let dictByParentId = {}
  for(let item of navItems) if(item.parentId) {
    if(!dictByParentId[item.parentId]) dictByParentId[item.parentId] = []
    dictByParentId[item.parentId].push(item.id)
  }

  return navItems.map(item => {
    const context = navigationDict[item.id]
    let meta = {}

    meta.childIds = dictByParentId[item.id] || []

    return Object.assign({}, context, item, meta)
  })
}

module.exports = async function fetchCategories(){
  const data = await fetch("https://s3.eu-central-1.amazonaws.com/wucu-at-initialstate-dev/HeaderMainNavigation.json").then(res => res.json())
  const navigation = await fetchHits('navigation')
  const navItems = data.find(row => row.templateOptions.dropdownItems).templateOptions.dropdownItems
  return createCategories(navItems, navigation)
}
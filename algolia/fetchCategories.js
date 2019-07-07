import fetch from 'node-fetch'
import fetchHits from './fetchHits'


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
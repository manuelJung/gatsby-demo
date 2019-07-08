var fetch = require('node-fetch')


function createDropdown (items) {
  let dictById = {}
  let dictByParentId = {}
  for(let item of items) dictById[item.id] = item
  for(let item of items) if(item.parentId) {
    if(!dictByParentId[item.parentId]) dictByParentId[item.parentId] = []
    dictByParentId[item.parentId].push(item)
  }

  function sortByWeight(item1,item2){
    // sort by label if no item has weight
    if(!item1.weight && !item2.weight) return item1.label.localeCompare(item2.label)
    // upvote item2 if only item2 has weight
    if(!item1.weight && item2.weight) return 1
    // upvote item1 if only item1 has weight
    if(item1.weight && !item2.weight) return -1
    // if items have same weight sort alpabetically
    if(item1.weight === item2.weight) return item1.label.localeCompare(item2.label)
    // sort by weight if both have weight
    return item1.weight > item2.weight ? 1 : -1
  }

  function resolveChildren (item) {
    if(!dictByParentId[item.id]) return item
    return Object.assign({}, item, {
      children: dictByParentId[item.id].map(resolveChildren).sort(sortByWeight)
    })
  }

  return items
    .filter(item => !item.parentId)
    .map(resolveChildren)
    .sort(sortByWeight)
}

function parseNavigation (data) {

  return data.map(row => {
    let result = {
      id: row.id,
      label: row.label,
      link: row.link,
      dropdown: null
    }

    if(row.templateOptions.dropdownItems){
      result.dropdown = createDropdown(row.templateOptions.dropdownItems)
    }

    return result
  })
}

module.exports = async function fetchNavigation(){
  const data = await fetch("https://s3.eu-central-1.amazonaws.com/wucu-at-initialstate-dev/HeaderMainNavigation.json").then(res => res.json())
  return parseNavigation(data)
}
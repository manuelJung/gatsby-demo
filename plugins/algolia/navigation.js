var crypto = require('crypto')
var fetch = require('node-fetch')


function createDropdown (items) {
  let dictById = {}
  let dictByParentId = {}
  for(let item of items) dictById[item.id] = item
  for(let item of items) if(item.parentId) {
    if(!dictByParentId[item.parentId]) dictByParentId[item.parentId] = []
    dictByParentId[item.parentId].push(item)
  }

  function resolveChildren (item) {
    if(!dictByParentId[item.id]) return item
    return Object.assign({}, item, {
      children: dictByParentId[item.id].map(resolveChildren)
    })
  }

  return items
    .filter(item => !item.parentId)
    .map(resolveChildren)

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
  return []
}
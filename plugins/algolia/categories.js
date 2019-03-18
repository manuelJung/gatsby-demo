var crypto = require('crypto')
var fetch = require('node-fetch')

const types = {
  CONTENT: 'content',
  SUBMENU: 'submenu',
  DEFAULT: 'default'
}

function parseCategories (data) {

  return data.map(row => ({
    id: row.id,
    label: row.label,
    link: row.link,
    parent: null, // or null if it's a source node without a parent
    children: [],
    internal: {
      type: 'headerCategory',
      contentDigest: crypto.createHash(`md5`).update(row.id).digest(`hex`),
    }
  }))
}

module.exports = async function fetchCategories(){
  const data = await fetch("https://s3.eu-central-1.amazonaws.com/wucu-at-initialstate-dev/HeaderMainNavigation.json").then(res => res.json())
  return parseCategories(data)
}
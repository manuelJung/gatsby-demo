require("babel-register")({
  presets: ['env', 'flow'],
  plugins: ["transform-object-rest-spread"]
})
require('babel-polyfill')
const node = require('./gatsby-node.babel')

console.log(node.createPages)

exports.createPages = node.createPages
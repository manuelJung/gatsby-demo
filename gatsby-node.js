require("babel-register")({
  presets: ['env', 'flow'],
  plugins: ["transform-object-rest-spread"]
})
require('babel-polyfill')
const node = require('./gatsby-node.babel')

exports.createPages = node.createPages
exports.createSchemaCustomization = node.createSchemaCustomization
exports.sourceNodes = node.sourceNodes
exports.onCreatePage = node.onCreatePage




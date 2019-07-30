require("babel-register")({
  presets: ['env', 'flow'],
  plugins: ["transform-object-rest-spread"]
})
require('babel-polyfill')
module.exports = require('./gatsby-node.babel')
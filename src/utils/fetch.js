
let fetch

try {
  fetch = require('node-fetch')
}
catch (e) {
  fetch = window.fetch
}

export default fetch
var tryRequire = require('try-require')
let fetch = tryRequire('node-fetch')

if(!fetch){
  if(typeof window !== 'undefined'){
    fetch = window.fetch
  }
}

export default fetch
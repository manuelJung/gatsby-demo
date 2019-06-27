import createStore from './createStore'

// ========================================================
// Store & History Instantiation
// ========================================================
let hasWindow
try {if(window) hasWindow=true}
catch(e){hasWindow=false}

const initialState = hasWindow ? window.___INITIAL_STATE__ : undefined
const store = createStore(initialState)

export { store }
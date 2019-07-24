// @flow
import { combineReducers } from 'redux'

import userModule from 'modules/user/reducer'


const staticReducers = {
  user: userModule
}


// export default () => combineReducers(reducers)

const createRootReducer = (reducers=staticReducers) => function rootReducer (state, action) {
  console.log(Object.keys(reducers))
  if(action.type === 'PARTIAL_STATE_UPDATES'){
    const updates = action.payload
    let newState = Object.assign({}, state)

    for(let update of updates){
      let subState = newState
      for(let i=0;i<update.path.length-1;i++){
        subState[update.path[i]] = Object.assign({}, subState[update.path[i]])
        if(i!==update.path.length) subState = subState[update.path[i]]
      } 
      subState[update.path[update.path.length-1]] = update.state
    }
    return newState
  }
  return combineReducers(reducers)(state, action)
}

export function injectReducer (store, key, reducer) {
  console.log('test', key)
  if(store.asyncReducers[key]) return
  store.asyncReducers[key] = reducer
  const newReducers = Object.assign({}, staticReducers, store.asyncReducers)
  const rootReducer = createRootReducer(newReducers)
  store.replaceReducer(rootReducer)
  console.log(store.getState())
}

export default createRootReducer
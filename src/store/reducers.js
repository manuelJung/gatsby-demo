// @flow
import { combineReducers } from 'redux'
import storefinderReducer from 'modules/storefinder/reducer'

import userModule from 'modules/user/reducer'


const reducers = {
  storefinder: storefinderReducer,
  user: userModule
}


// export default () => combineReducers(reducers)

export default () => function rootReducer (state, action) {
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

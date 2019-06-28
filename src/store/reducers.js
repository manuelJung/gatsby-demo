// @flow
import { combineReducers } from 'redux'
import storefinderReducer from 'modules/storefinder/reducer'


const reducers = {
  storefinder: storefinderReducer
}


// export default () => combineReducers(reducers)

export default () => function rootReducer (state, action) {
  if(action.type === 'PARTIAL_STATE_UPDATE'){
    let newState = Object.assign({}, state)
    let subState = newState

    for(let i=0;i<action.path.length-1;i++){
      subState[action.path[i]] = Object.assign({}, subState[action.path[i]])
      if(i!==action.path.length) subState = subState[action.path[i]]
    }

    subState[action.path[action.path.length-1]] = action.payload

    return newState
  }
  return combineReducers(reducers)(state, action)
}

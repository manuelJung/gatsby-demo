// @flow
import { combineReducers } from 'redux'
import storefinderReducer from 'modules/storefinder/reducer'


const reducers = {
  storefinder: storefinderReducer
}


export default () => combineReducers(reducers)

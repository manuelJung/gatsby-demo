// @flow

import type {User, Cart} from './entities'
import type {Action} from './actions'
import * as at from './const'
import './rules'

export type State = {|
  data: User,
  cart: Cart
|}

const defaultState = {
  data: {
    hasFetched: false,
    isLoggedIn: false,
    firstname: '',
    lastname: '',
    email: ''
  },
  cart: {
    items: [],
    isFetching: false,
    isAdding: false,
    fetchError: null,
    addError: null
  }
}

export default function reducer(state:State=defaultState, action:Action):State {
  switch(action.type){
    case at.ADD_ITEM_REQUEST: {
      return { 
        ...state, 
        cart: {
          ...state.cart,
          isAdding: true,
          addError: null
        }
      }
    }
    case at.ADD_ITEM_SUCCESS: {
      return { 
        ...state, 
        data: action.payload.user,
        cart: {
          ...state.cart,
          isAdding: false, 
          items: action.payload.items 
        }
      }
    }
    case at.ADD_ITEM_FAILURE: {
      return { 
        ...state,
        data: { ...state.data, hasFetched: true},
        cart: {
          ...state.cart,
          isAdding: false, 
          addError: action.payload
        }
      }
    }
    case at.FETCH_CART_REQUEST: {
      return {
        ...state,
        cart: {
          ...state.cart,
          isFetching: true,
          fetchError: null
        }
      }
    }
    case at.FETCH_CART_SUCCESS: {
      return {
        ...state,
        data: action.payload.user,
        cart: {
          ...state.cart,
          isFetching: false,
          items: action.payload.items
        }
      }
    }
    case at.FETCH_CART_FAILURE: {
      return {
        ...state,
        data: { ...state.data, hasFetched: true},
        cart: {
          ...state.cart,
          isFetching: false,
          fetchError: action.payload
        }
      }
    }

    default: return state
  }
}
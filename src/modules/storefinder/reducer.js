import './rules'

type State = {
  isFetching: boolean,
  fetchError: string | null,
  data: null | string
}

const defaultState = {
  isFetching: false,
  fetchError: null,
  data: null
}

export default function reducer (state:State=defaultState, action) {
  switch(action.type) {
    case 'storefinder/FETCH_REQUEST':
      return {...state, isFetching: true, fetchError: null}
    case 'storefinder/FETCH_FAILURE':
      return {...state, isFetching: false, fetchError: action.payload}
    case 'storefinder/FETCH_SUCCESS':
      return {...state, isFetching: false, data: action.payload}
    default: return state
  }
}


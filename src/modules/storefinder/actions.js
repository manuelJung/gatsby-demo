
export const fetchRequest = () => ({
  type: 'storefinder/FETCH_REQUEST'
})

export const fetchFailure = error => ({
  type: 'storefinder/FETCH_FAILURE',
  payload: error
})

export const fetchSuccess = result => ({
  type: 'storefinder/FETCH_SUCCESS',
  payload: result
})
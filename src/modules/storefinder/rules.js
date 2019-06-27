import {addRule} from 'redux-ruleset'
import * as api from './utils/api'
import * as actions from './actions'

addRule({
  id: 'storefinder/FETCH',
  target: 'storefinder/FETCH_REQUEST',
  consequence: () => api.fetch().then(
    result => actions.fetchSuccess(result),
    error => actions.fetchFailure(error)
  )
})
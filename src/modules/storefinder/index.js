// @flow
import './rules'
import {store} from 'store/bootstrap'
import {injectReducer} from 'store/reducers'
import reducer from './reducer'

injectReducer(store, 'storefinder', reducer)

export {default as useStorefinder} from './hooks/useStorefinder'

export default reducer
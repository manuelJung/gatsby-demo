import {addRule} from 'redux-ruleset'
import * as actions from './actions'
import * as at from './const'
import * as api from './utils/api'


addRule({
  id: 'user/FETCH_CART',
  target: at.FETCH_CART_REQUEST,
  concurrency: 'SWITCH',
  consequence: () => api.fetchCart().then(
    cart => actions.fetchCartSuccess(cart),
    error => actions.fetchCartFailure(error.toString())
  ),
})

addRule({
  id: 'user/ADD_ITEM',
  target: at.ADD_ITEM_REQUEST,
  concurrency: 'SWITCH',
  consequence: ({action: {meta}}) => api.addItem(meta.sku, meta.groupedId).then(
    cart => actions.addItemSuccess(meta.sku, meta.groupedId, cart),
    error => actions.addItemFailure(meta.sku, meta.groupedId, error.toString())
  )
})

addRule({
  id: 'user/INITIAL_CART_FETCH',
  target: '*',
  addOnce: true,
  consequence: () => actions.fetchCartRequest()
})
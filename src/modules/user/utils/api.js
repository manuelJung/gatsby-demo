// @flow
// import config from 'config'
import type {Item, Sku, User} from '../entities'
import fetch from 'utils/fetch'
const config = {}

export type CartResponse = {
  items: Item[],
  user: User
}

const mapCartResponse = (original:Object):CartResponse => ({
  items: !original.items ? [] : original.items.map(item => ({
    sku: item.sku,
    amount: item.qty,
    groupedId: item.groupedId
  })),
  user: Object.assign({
    hasFetched: true,
    isLoggedIn: false,
    email: '',
    firstname: '',
    lastname: ''
  }, original.customer)
})

export const fetchCart = ():Promise<CartResponse> => {
  return Promise.reject('not working')
  // return fetch('', {
  //   credentials: 'include', 
  //   mode: 'cors'
  // })
  // .then(res => res.json())
  // .then(mapCartResponse)
}

export const addItem = (sku:Sku, groupedId:string):Promise<CartResponse> => {
  return fetch(`${config.apiEndpoints.checkoutCartAdd}?sku=${sku}&qty=1`, {
    credentials: 'include',
    mode: 'cors'
  })
  .then(res => res.json())
  .then(content => {
    if(content.added_item && content.added_item.status === 'error'){
      return Promise.reject(content.added_item.message)
    }
    return content
  })
  .then(mapCartResponse)
}
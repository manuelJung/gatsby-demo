// @flow
import * as at from './const'

import type {Sku} from './entities'
import type {CartResponse} from './utils/api'

export type FetchCartRequestAction = {
  type: typeof at.FETCH_CART_REQUEST
}

export type FetchCartSuccessAction = {
  type: typeof at.FETCH_CART_SUCCESS,
  payload: CartResponse
}

export type FetchCartFailureAction = {
  type: typeof at.FETCH_CART_FAILURE,
  payload: string
}

export type AddItemRequestAction = {
  type: typeof at.ADD_ITEM_REQUEST,
  meta: { sku: Sku, groupedId: string }
}

export type AddItemSuccessAction = {
  type: typeof at.ADD_ITEM_SUCCESS,
  meta: { sku: Sku, groupedId: string },
  payload: CartResponse
}

export type AddItemFailureAction = {
  type: typeof at.ADD_ITEM_FAILURE,
  meta: { sku: Sku, groupedId: string },
  payload: string
}

export type Action = AddItemRequestAction
| AddItemSuccessAction
| AddItemFailureAction
| FetchCartRequestAction
| FetchCartSuccessAction
| FetchCartFailureAction

export const fetchCartRequest = ():FetchCartRequestAction => ({
  type: at.FETCH_CART_REQUEST
})

export const fetchCartSuccess = (response:CartResponse):FetchCartSuccessAction => ({
  type: at.FETCH_CART_SUCCESS,
  payload: response
})

export const fetchCartFailure = (error:string):FetchCartFailureAction => ({
  type: at.FETCH_CART_FAILURE,
  payload: error
})

export const addItemRequest = (sku:Sku, groupedId:string):AddItemRequestAction => ({
  type: at.ADD_ITEM_REQUEST,
  meta: { sku, groupedId }
})

export const addItemSuccess = (sku:Sku, groupedId:string, response:CartResponse):AddItemSuccessAction => ({
  type: at.ADD_ITEM_SUCCESS,
  meta: { sku, groupedId },
  payload: response
})

export const addItemFailure = (sku:Sku, groupedId:string, error:string):AddItemFailureAction => ({
  type: at.ADD_ITEM_FAILURE,
  meta: { sku, groupedId },
  payload: error
})


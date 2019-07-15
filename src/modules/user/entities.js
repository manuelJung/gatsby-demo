// @flow

export type Sku = string

export type Item = {
  sku: Sku,
  groupedId: string,
  amount: number
}

export type Cart = {
  items: Item[],
  isFetching: boolean,
  isAdding: boolean,
  fetchError: string | null,
  addError: string | null
}

export type User = {
  isLoggedIn: boolean,
  firstname: string,
  lastname: string,
  email: string,
  hasFetched: boolean
}
// @flow
import type {State} from './reducer'
import type {Cart, User} from './entities'

export const getCart = (state:State):Cart => state.cart

export const getUser = (state:State):User => state.data 



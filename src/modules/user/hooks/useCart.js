// @flow
import * as t from '../entities'
import * as s from '../selectors'
import * as a from '../actions'
import useConnect from 'utils/useConnect'

export type Props = $Diff<{},{}>

export type InjectedProps = {
  data: $Diff<t.Cart,{}>,
  addItem: *,
  fetch: *
}

const mapState = (state, props) => ({
  data: s.getCart(state.user)
})

const mapDispatch = {
  fetch: a.fetchCartRequest,
  addItem: a.addItemRequest
}

const mergeProps = (sp,dp,props) => Object.assign({}, sp, dp)

const options = { areStatesEqual: (a,b) => a.user === b.user }

export default function useCart(props:Props={}):$Diff<InjectedProps,{}>{
  const hook = useConnect/*::<Props, InjectedProps,*,*>*/(props, mapState, mapDispatch, mergeProps, options)
  return hook
}
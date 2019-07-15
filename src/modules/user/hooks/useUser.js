// @flow
import * as t from '../entities'
import * as s from '../selectors'
import useConnect from 'utils/useConnect'

export type Props = {}

export type InjectedProps = {
  data: $Diff<t.User,{}>
}

const mapState = (state, props) => ({
  data: s.getUser(state.user)
})

const mapDispatch = {}

const mergeProps = (sp,dp,props) => sp

const options = { areStatesEqual: (a,b) => a.user === b.user }

export default function useUser(props:Props={}):$Diff<InjectedProps,{}>{
  const hook = useConnect/*::<Props, InjectedProps,*,*>*/(props, mapState, mapDispatch, mergeProps, options)
  return hook
}
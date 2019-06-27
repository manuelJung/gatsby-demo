// @flow
import {addRule} from 'redux-ruleset'
import * as t from '../entities'
import * as a from '../actions'
import useConnect from 'utils/useConnect'

export type Props = {}

export type InjectedProps = {
  data: t.string | null,
  isFetching: boolean,
  fetchError: null | string,
  shouldFetch: boolean
}

const mapState = (state, props) => ({
  data: state.storefinder.data,
  isFetching: state.storefinder.isFetching,
  fetchError: state.storefinder.fetchError,
  shouldFetch: !state.storefinder.data && !state.storefinder.isFetching && !state.storefinder.fetchError
})

const mapDispatch = {
  fetch: a.fetchRequest
}

const mergeProps = (sp,dp,props) => Object.assign({}, sp, dp)

const options = { areStatesEqual: (a,b) => a.storefinder === b.storefinder }

export default function useListRequest(props:Props):InjectedProps{
  const hook = useConnect/*::<Props, InjectedProps,*,*>*/(props, mapState, mapDispatch, mergeProps, options)

  React.useEffect(() => {
    if(hook.shouldFetch) hook.fetch()
  })

  return hook
}


function useStorefinder (props) {
  const hook = useConnect()

  React.useEffect(() => {
    if(hook.shouldFetch) hook.fetch()
  })

  return hook
}

useStorefinder.preload = function (store, props) {
  store.dispatch(a.fetch(props.identifier))
  
  return new Promise((resolve,reject) => {
    addRule({
      id: 'useStorefinder',
      target: [at.FETCH_SUCCESS, at.FETCH_FAILURE],
      consequence: ({action}) => {
        if(action.type === at.FETCH_FAILURE) reject()
        else resolve()
      }
    })
  })
}
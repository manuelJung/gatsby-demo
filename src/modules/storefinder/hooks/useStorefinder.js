// @flow
import {addRule} from 'redux-ruleset'
import * as a from '../actions'
import useConnect from 'utils/useConnect'

export type Props = {}

export type InjectedProps = {
  data: string | null,
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

export default function useStorefinder(props:Props):InjectedProps{
  const hook = useConnect/*::<Props, InjectedProps,*,*>*/(props, mapState, mapDispatch, mergeProps, options)

  React.useEffect(() => {
    if(hook.shouldFetch) hook.fetch()
  })

  return hook
}

useStorefinder.preload = function (store, props) {
  store.dispatch(a.fetchRequest(props.identifier))
  
  return new Promise((resolve,reject) => {
    addRule({
      id: 'useStorefinder',
      target: ['storefinder/FETCH_SUCCESS', 'storefinder/FETCH_FAILURE'],
      addOnce: true,
      consequence: ({action}) => {
        if(action.type === 'storefinder/FETCH_FAILURE') reject('reject')
        else resolve('resolve')
      }
    })
  })
}
// @flow
import * as React from 'react'
import {store} from 'store/bootstrap'

type Props = {
  children: React.Node,
  partialStateUpdates?: {
    path: string[],
    state: Object
  }[]
}

export default function Redux ({children, partialStateUpdates}:Props) {
  partialStateUpdates && partialStateUpdates.length && store.dispatch({
    type: 'PARTIAL_STATE_UPDATES',
    payload: partialStateUpdates
  })
  return children
}
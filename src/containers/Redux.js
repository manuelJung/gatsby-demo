// @flow
import * as React from 'react'
import {store} from 'store/bootstrap'

type Props = {
  children: React.Node,
  partialStateUpdates: {
    path: string[],
    state: Object
  }[]
}

export default function Redux ({children, partialStateUpdates}:Props) {
  partialStateUpdates.forEach(update => {
    store.dispatch({
      type: 'PARTIAL_STATE_UPDATE',
      path: update.path,
      payload: update.state
    })
  })
  return children
}
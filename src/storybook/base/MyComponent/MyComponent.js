// @flow
import * as React from 'react'
import useStorefinder from 'modules/storefinder/hooks/useStorefinder'

export default function MyComponent (props) {
  const storefinder = useStorefinder()

  console.log(props)

  if(storefinder.isFetching) return <h1>loading...</h1>

  return <h1>{storefinder.data}</h1>
}
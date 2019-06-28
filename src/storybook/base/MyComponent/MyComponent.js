// @flow
import * as React from 'react'
import useStorefinder from 'modules/storefinder/hooks/useStorefinder'

export default function MyComponent ({initialProps}) {
  const storefinder = useStorefinder()

  console.log(initialProps)

  if(storefinder.isFetching) return <h1>loading...</h1>

  return <h1>{storefinder.data}</h1>
}
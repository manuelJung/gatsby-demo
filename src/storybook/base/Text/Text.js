// @flow
import * as React from 'react'

type Props = {
  children: string
}

export default function Text ({children}:Props) {
  return (
    <div className='Text' dangerouslySetInnerHTML={{__html: children}}/>
  )
}

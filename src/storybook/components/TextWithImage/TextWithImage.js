// @flow
import * as React from 'react'

type Props = {
  children: string
}

export default function TextWithImage ({textProps, imageProps}:Props) {
  return (
    <div className='TextWithImage'>
      <h3>TEXT-WITH-IMAGE {imageProps.src}</h3>
      <div className='text' dangerouslySetInnerHTML={{__html: textProps.children}}/>
    </div>
  )
}

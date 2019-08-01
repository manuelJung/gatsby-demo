// @flow
import * as React from 'react'
import styled from 'styled-components'

type Props = {
  children: string,
  centered: boolean
}

export default function Text ({children, centered}:Props) {
  return (
    <Wrapper
      className='Text' 
      centered={centered}
      dangerouslySetInnerHTML={{__html: children}}/>
  )
}

const Wrapper = styled.div`
  ${props => props.centered && `text-align:center;`}
`
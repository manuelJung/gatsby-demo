// @flow
import React from 'react'
import styled from 'styled-components'
import Header from './Header'

export default function Layout (props) {
  return (
    <Wrapper>
      <Header/>
      {props.children}
    </Wrapper>
  )
}

const Wrapper = styled.div`
`
// @flow
import React from 'react'
import styled from 'styled-components'
import Logo from './Logo'

export default function Layout (props) {
  return (
    <Wrapper>
      <h1>Header</h1>
      <Logo/>
      {props.children}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  > h1 {
    text-decoration: underline;
  }
`
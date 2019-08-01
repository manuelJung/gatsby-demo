// @flow
import * as React from 'react'
import styled from 'styled-components'
import { IoMdMenu } from 'react-icons/io'

export default function Drawer () {
  return (
    <Wrapper className='Drawer'>
      <IoMdMenu/>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 25px;
  color: #993452;
  font-size: 25px;
  padding:10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`
// @flow
import * as React from 'react'
import styled from 'styled-components'
import {Link} from 'gatsby'

type Props = {
  items: mixed[]
}

export default function Navigation (props:Props) {
  return (
    <Wrapper className='Navigation'>
      {props.items.map(node => (
        <Link key={node.link} to={node.link}>
          {node.label}
        </Link>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  background: white;
  > a {
    flex: 1; 
    display: inline-block;
    font-size: 11px;
    padding: 10px;
    color: #777;
    text-align: center;
    border-bottom: 1px solid lightgrey;

    @media (min-width: 1200px) {
      font-size: 14px;
    }

    &:hover {
      margin-bottom: 0px;
      color: #993452;
      border-bottom: 1px solid #993452;
      &:after {border-top: 4px solid #993452;}
    }
  }
`
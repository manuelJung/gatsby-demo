// @flow
import * as React from 'react'
import styled from 'styled-components'


type Props = {
  src: string,
  alt: string,
  link: string,
  title: string,
  subtitle: string,
  overlayColor: string,
  overlayPosition: string,
  ratio: string,
  ratioSubtitle: string
}

export default function Banner (props:Props) {
  return (
    <Wrapper className='Banner'>
      <img src={props.src} alt={props.alt} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  > img {width:100%;}
`
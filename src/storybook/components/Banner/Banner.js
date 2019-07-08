// @flow
import * as React from 'react'
import styled from 'styled-components'
import useLazyImageSrc from 'hooks/useLazyImageSrc'


type Props = {
  src: string,
  alt: string,
  link: string,
  title: string,
  subtitle: string,
  overlayColor: string,
  overlayPosition: string,
  ratio: string,
  ratioSubtitle: string,
  context: {
    base64: string
  }
}

export default function Banner (props:Props) {
  const [ref, image] = useLazyImageSrc(props.src, props.context.base64)
  return (
    <Wrapper className='Banner'>
      <img ref={ref} src={image} alt={props.alt} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  > img {width:100%;}
`
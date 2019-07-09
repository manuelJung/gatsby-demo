// @flow
import * as React from 'react'
import styled from 'styled-components'
import useLazyImageSrc from 'hooks/useLazyImageSrc'

type Props = {
  alt: string,
  src: string,
  context: {
    base64: string
  }
}

export default function ImageWithLinks ({alt,src,context}:Props) {
  const [ref, image] = useLazyImageSrc(src, context.base64)

  return (
    <Wrapper className='ImageWithLinks'>
      <div className='image-wrapper'>
        <img ref={ref} src={image} alt={alt}/>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  > .image-wrapper {
    width: 100%;
    > img { width: 100%; }
  }
`
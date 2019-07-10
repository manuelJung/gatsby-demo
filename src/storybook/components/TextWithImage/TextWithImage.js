// @flow
import * as React from 'react'
import styled from 'styled-components'
import useLazyImageSrc from 'hooks/useLazyImageSrc'

type Props = {
  textProps: { children: string },
  imageProps: {
    src: string,
    alt: string
  },
  context: {
    base64: string
  }
}

export default function TextWithImage ({textProps, imageProps, context}:Props) {
  const [ref, image] = useLazyImageSrc(imageProps.src, context.base64)

  return (
    <Wrapper className='TextWithImage'>
      <div className='image'>
        <div className='image-wrapper'>
          <img ref={ref} src={image} alt={imageProps.alt}/>
        </div>
      </div>
      <div className='text' dangerouslySetInnerHTML={{__html: textProps.children}}/>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  > .image {
    width: 100%;
    > .image-wrapper {
      width: 100%;
      > img { width: 100%; }
    }
  }
`
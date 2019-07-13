// @flow
import * as React from 'react'
import styled from 'styled-components'
import useLazyImageSrc from 'hooks/useLazyImageSrc'



export default function Image ({alt, src, label, context /*, context: {fluid}*/}) {
  const [ref, image] = useLazyImageSrc(src, context.base64)

  return (
    <Wrapper className='Image'>
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
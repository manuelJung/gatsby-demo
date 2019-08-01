// @flow
import * as React from 'react'
import * as t from './types'
import styled from 'styled-components'
import useLazyImageSrc from 'hooks/useLazyImageSrc'
import MaybeLink from 'theme/atoms/MaybeLink'

export default function Image ({alt, src, label, link, context /*, context: {fluid}*/}:t.Props) {
  const [ref, image] = useLazyImageSrc(src, context.base64)

  return (
    <Wrapper className='Image'>
      <MaybeLink className='image-wrapper' to={link}>
        <img ref={ref} src={image} alt={alt}/>
      </MaybeLink>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  > .image-wrapper {
    cursor: pointer;
    display: block;
    width: 100%;
    > img { width: 100%; }
  }
`
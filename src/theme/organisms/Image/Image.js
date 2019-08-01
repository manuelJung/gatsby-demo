// @flow
import * as React from 'react'
import styled from 'styled-components'
import useLazyImageSrc from 'hooks/useLazyImageSrc'
import {Link} from 'gatsby'



export default function Image ({alt, src, label, link, context /*, context: {fluid}*/}) {
  const [ref, image] = useLazyImageSrc(src, context.base64)

  return (
    <Wrapper className='Image'>
      <Link className='image-wrapper' to={link}>
        <img ref={ref} src={image} alt={alt}/>
      </Link>
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
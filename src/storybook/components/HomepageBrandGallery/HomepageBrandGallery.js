// @flow
import * as React from 'react'
import styled from 'styled-components'
import useLazyImageSrc from 'hooks/useLazyImageSrc'

type Props = {
  title: string,
  images: {
    src:string,
    alt:string,
    link:string
  }[],
  context: {
    base64Images: string[]
  }
}

export default function HomepageBrandGallery ({title, images, context}:Props) {
  return (
    <Wrapper className='HomepageBrandGallery'>
      <h3>{title}</h3>
      <ul className='gallery'>
        {images.map((img,i) => 
          <li key={img.src}>
            <Image {...img} base64={context.base64Images[i]}/>
          </li>
        )}
      </ul>
    </Wrapper>
  )
}

function Image (props:*) {
  const [ref, image] = useLazyImageSrc(props.src, props.base64)
  return <img ref={ref} src={image} alt={props.alt} />
}

const Wrapper = styled.div`
  > .gallery {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap:15px;
    justify-items: center;

    li, img {
        width:100%;
    }
  }
`
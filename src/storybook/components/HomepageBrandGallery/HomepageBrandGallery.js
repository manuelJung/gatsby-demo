// @flow
import * as React from 'react'
import styled from 'styled-components'

type Props = {
  title: string,
  images: {
    src:string,
    alt:string,
    link:string
  }[]
}

export default function HomepageBrandGallery ({title, images}:Props) {
  return (
    <Wrapper className='HomepageBrandGallery'>
      <h3>{title}</h3>
      <ul className='gallery'>
        {images.map(img => 
          <li key={img.src}>
            <img src={img.src} alt={img.alt}/>
          </li>
        )}
      </ul>
    </Wrapper>
  )
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
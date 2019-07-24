// @flow
import * as React from 'react'
import styled from 'styled-components'
import useLazyImageSrc from 'hooks/useLazyImageSrc'
// import {useStorefinder} from 'modules/storefinder'
import {Link} from 'gatsby'

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
  // const storefinder = useStorefinder()
  return (
    <Wrapper className='HomepageBrandGallery'>
      <h3>{title}</h3>
      <div className='gallery'>
        {images.map((img,i) => 
          <Link key={img.src} to={img.src}>
            <Image {...img} base64={context.base64Images[i]}/>
          </Link>
        )}
      </div>
      {/* <div>{storefinder.data}</div> */}
    </Wrapper>
  )
}

function Image (props:*) {
  const [ref, image] = useLazyImageSrc(props.src, props.base64)
  return <img ref={ref} src={image} alt={props.alt} />
}

const Wrapper = styled.div`
  line-height: 1;
  > h3 {
    margin-top: 3px;
    margin-bottom: 23px;
    padding-bottom: 7px;
    font-size: 15px;
    color: rgb(85, 85, 85);
    font-weight: 500;
    border-bottom: 2px solid rgb(238, 236, 237);
  }
  > .gallery {
    display:grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap:15px;
    justify-items: center;

    img { width:100%; }
    a {display: block; width: 100%;}
  }
`
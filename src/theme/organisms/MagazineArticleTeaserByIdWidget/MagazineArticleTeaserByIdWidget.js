// @flow
import * as React from 'react'
import styled from 'styled-components'
import useLazyImageSrc from 'hooks/useLazyImageSrc'

type Props = {
  magazineArticleId: string,
  context: {
    article: any,
    base64: string
  }
}

export default function MagazineArticleTeaserByIdWidget ({context}:Props) {
  const {categoryName, sponsoredArticle, teaserImageUrl, title} = context.article
  const [ref, image] = useLazyImageSrc(teaserImageUrl, context.base64)
  return (
    <Wrapper className='MagazineArticleTeaserByIdWidget'>
      <div>
        <h3>{categoryName} {sponsoredArticle && '(Anzeige)'}</h3>
        <img ref={ref} src={image} alt='title'/>
        <div className='title'>
          <div className='shaddow'/>
          <h5 className='text'>{title}</h5>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: block;
  cursor: pointer;
  position: relative;

  max-width: 300px;

  &:before {
    content: "";
    display: block;
    padding-top: 100%;
  }


  > div {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    > h3 {
      box-sizing: border-box;
      color: white;
      text-align: center;
      background: #6d6e71;
      padding: .5em;
      margin: 0;
      font-size: 1em;
      position: absolute;
      width: inherit;
      width: 100%;

      &:hover & { background: '#993452'; }

      @media (min-width: 1200px) {
        font-size: 1.2em;
      }
    }

    > img {
      width: 100%;
    }

    > .title {
      position: absolute;
      bottom: 0;
      width: 100%;

      > .shaddow {
        height: 1em;
        background: linear-gradient(0deg,rgba(0,0,0,.4),rgba(0,0,0,0));  
      }

      > .text {
        margin: 0;
        color: white;
        padding: 10px;
        padding-top: 5px;
        background: rgba(0,0,0,.4);
        width: 100%;
      }

      > h5 { box-sizing: border-box; width: 100%; }
    }
  }
`
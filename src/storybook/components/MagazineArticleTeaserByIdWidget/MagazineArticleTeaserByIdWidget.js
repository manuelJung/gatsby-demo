// @flow
import * as React from 'react'
import styled from 'styled-components'

type Props = {
  magazineArticleId: string,
  context: {
    article: any
  }
}

export default function MagazineArticleTeaserByIdWidget ({context:{article}}:Props) {
  console.log(article)
  return (
    <Wrapper className='MagazineArticleTeaserByIdWidget'>
      MagazineArticleTeaserByIdWidget
    </Wrapper>
  )
}

const Wrapper = styled.div``
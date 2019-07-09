// @flow
import * as React from 'react'
import styled from 'styled-components'
import ProductWidget from 'components/ProductWidget'

type Props = {
  title: string,
  context: {
    products: any
  }
}

export default function HomepageRecommendations(props:Props){
  return (
    <Wrapper className='HomepageRecommendations'>
      <h3>{props.title}</h3>
      <div className='list'>
        {props.context.products.map(product => (
          <ProductWidget key={product.objectID} product={product}/>
        ))}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  > h3 {
    text-align: center;
  }
  > .list {
    background: #EEECED;
    padding: 15px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;

    @media(min-width:768px){
      grid-template-columns: repeat(3, 1fr);
    }

    @media(min-width:990px){
      grid-template-columns: repeat(4, 1fr);
    }
  }
`
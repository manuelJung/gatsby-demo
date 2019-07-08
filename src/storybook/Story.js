import * as React from 'react'
import * as components from 'storybook/components'
import styled from 'styled-components'

type Props = {
  story: mixed
}

export default function Story ({story}:Props) {
  console.log(story)
  if(!story) return null
  return (
    <Wrapper className='Story' grids={story.grids}>
      {Object.values(story.dict).map(({id,name,props}) => {
        const Component = components[name]

        if(!Component) return (
          <NotFound className={props.gridArea} gridArea={props.gridArea} key={id}>
            Component "{name}" not found
          </NotFound>
        )

        return (
          <ComponentWrapper className={props.gridArea} gridArea={props.gridArea}>
            <Component key={id} {...props}/>
          </ComponentWrapper>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: grid;
  ${props => props.grids.MOBILE_M}
  @media (min-width: 375px) { ${props => props.grids.MOBILE_L} }
  @media (min-width: 525px) { ${props => props.grids.TABLET} }
  @media (min-width: 768px) { ${props => props.grids.LAPTOP} }
  @media (min-width: 990px) { ${props => props.grids.LAPTOP_L} }
  @media (min-width: 1200px) { ${props => props.grids.LAPTOP_XL} }
`

const NotFound = styled.h1`
  grid-area: ${props => props.gridArea};
`

const ComponentWrapper = styled.div`
  grid-area: ${props => props.gridArea};
`
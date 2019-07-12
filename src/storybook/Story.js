import * as React from 'react'
import * as components from 'storybook/components'
import styled from 'styled-components'

type Props = {
  story: mixed
}

export default function Story ({story}:Props) {
  // console.log(story)
  if(!story) return null
  return (
    <Wrapper className='Story' grids={story.grids}>
      {story.components.map(id => {
        const {name,props} = story.dict[id] || {}
        const Component = components[name]

        if(!name) return null

        if(!Component) return (
          <NotFound className={props.gridArea + ' CmsWrapper'} gridArea={props.gridArea} key={id}>
            Component "{name}" not found
          </NotFound>
        )

        return (
          <ComponentWrapper className={props.gridArea + ' CmsWrapper'} gridArea={props.gridArea}>
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

  margin: 0 auto;

  @media (max-width: 525px) {
    padding: 10px;
  }
  @media (min-width: 525px) {
    padding: 20px;
  }
  @media (min-width: 768px) {
    padding: 0px;
    width: 690px;
  }
  @media (min-width: 990px) {
    width: 910px;
  }
  @media (min-width: 1200px) {
    width: 1110px;
  }
`

const NotFound = styled.h1`
  grid-area: ${props => props.gridArea};
`

const ComponentWrapper = styled.div`
  grid-area: ${props => props.gridArea};
  width: 100%;
  height: 100%;

  > * {width: 100%;height:100%;}
`
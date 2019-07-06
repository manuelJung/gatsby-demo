import * as React from 'react'
import * as components from 'storybook/components'

type Props = {
  story: mixed
}

export default function Story ({story}:Props) {
  if(!story) return null
  return (
    <div className='Story'>
      {story.grids.MOBILE_M.components.map(id => story.dict[id]).map(({id,name,props}) => {
        const Component = components[name]

        if(!Component) return <h1 key={id}>Component "{name}" not found</h1>

        return <Component key={id} {...props}/>
      })}
    </div>
  )
}
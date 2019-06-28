import * as React from 'react'
import * as components from 'storybook/components'

type Props = {
  story: mixed,
  storyContext: {[id:string]:mixed}
}

export default function Story ({story, storyContext}:Props) {
  return (
    <div className='Story'>
      {story.grids.MOBILE_M.components.map(id => story.dict[id]).map(({id,name,props}) => {
        const Component = components[name]

        if(!Component) return <h1>Component "{name}" not found</h1>

        return <Component key={id} {...props} context={storyContext[id]}/>
      })}
    </div>
  )
}
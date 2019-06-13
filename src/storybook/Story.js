import * as React from 'react'

type Props = {
  story: mixed,
  componentContextDict: {[id:string]:mixed}
}

export default function Story ({story, componentContextDict}) {
  return (
    <div className='Story'>
      {story.grids.MOBILE_M.components.map(id => story.dict[id]).map(({id,props}) => {
        const Component = () => <div/>

        return <Component key={id} {...props} context={componentContextDict[id] || null}/>
      })}
    </div>
  )
}
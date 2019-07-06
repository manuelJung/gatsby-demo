const store = {}

export default async function preprocessStory (rawStory, {cache}) {
  let story = {dict:{},grids:{},partialStateUpdates:[]}
  if(!rawStory) return story

  const byGridName = rawStory.COMPONENTS.reduce((dict, next) => (dict[next.props.gridArea]=next.id) && dict, {})

  await Promise.all(rawStory.COMPONENTS.map(async component => {
    const request = getRequest(component.name)
    if(request){
      if(request.preprocessProps){
        const newProps = await request.preprocessProps({props: component.props, cache})
        component.props = newProps
      }
      if(request.createPartialStateUpdates){
        const partialStateUpdates = await request.createPartialStateUpdates(store, component.props)
        story.partialStateUpdates.push(...partialStateUpdates)
      }
      if(request.createContext){
        const context = await request.createContext({props: component.props, cache})
        component.props.context = context
      }
    }

    story.dict[component.id] = component
  }))

  story.grids = {
    MOBILE_M: {
      components: rawStory.GRID.MOBILE_M.components.map(gridName => byGridName[gridName]),
      css: rawStory.GRID.MOBILE_M.content + ';\ngrid-gap:' + rawStory.GRID_GAP.MOBILE_M + 'px;'
    }
  }

  return story
}

function getRequest (name) {
  try {
    const request = require(`./components/${name}/request`)
    return request
  }
  catch(e){
    return null
  }
}
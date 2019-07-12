const store = {}

export default async function preprocessStory (rawStory, {cache}) {
  let story = {dict:{},grids:{},partialStateUpdates:[], components: []}
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

  { // create component list by mobile grid order first (to prevent flickering)
    let mobileComponentsDict = {}
    let components = new Set()
    rawStory.GRID.MOBILE_M.content
      .replace(/\/.*/, '')
      .match(/".*"/g)
      .map(row => row.match(/[A-z0-9]*/g))
      .forEach(row => row.forEach(component => {
        const id = byGridName[component]
        if(id){
          mobileComponentsDict[id] = true
          components.add(id)
        }
      }))

    Object.keys(story.dict).forEach(id => {
      if(!mobileComponentsDict[id]) components.add(id)
    })
    story.components = Array.from(components)
  }

  story.grids = {}
  if(rawStory.GRID.MOBILE_M.active) {
    const flexedClasses = flexClasses(rawStory.GRID.MOBILE_M.components)
    story.grids.MOBILE_M = `grid: ${rawStory.GRID.MOBILE_M.content}; grid-gap: ${rawStory.GRID_GAP.MOBILE_M}px; > .CmsWrapper{display:none} ${flexedClasses}`
  }

  if(rawStory.GRID.MOBILE_L.active) {
    const flexedClasses = flexClasses(rawStory.GRID.MOBILE_L.components)
    story.grids.MOBILE_L = `grid: ${rawStory.GRID.MOBILE_L.content}; grid-gap: ${rawStory.GRID_GAP.MOBILE_L}px; > .CmsWrapper{display:none} ${flexedClasses}`
  }

  if(rawStory.GRID.TABLET.active) {
    const flexedClasses = flexClasses(rawStory.GRID.TABLET.components)
    story.grids.TABLET = `grid: ${rawStory.GRID.TABLET.content}; grid-gap: ${rawStory.GRID_GAP.TABLET}px; > .CmsWrapper{display:none} ${flexedClasses}`
  }

  if(rawStory.GRID.LAPTOP.active) {
    const flexedClasses = flexClasses(rawStory.GRID.LAPTOP.components)
    story.grids.LAPTOP = `grid: ${rawStory.GRID.LAPTOP.content}; grid-gap: ${rawStory.GRID_GAP.LAPTOP}px; > .CmsWrapper{display:none} ${flexedClasses}`
  }

  if(rawStory.GRID.LAPTOP_L.active) {
    const flexedClasses = flexClasses(rawStory.GRID.LAPTOP_L.components)
    story.grids.LAPTOP_L = `grid: ${rawStory.GRID.LAPTOP_L.content}; grid-gap: ${rawStory.GRID_GAP.LAPTOP_L}px; > .CmsWrapper{display:none} ${flexedClasses}`
  }

  if(rawStory.GRID.LAPTOP_XL.active) {
    const flexedClasses = flexClasses(rawStory.GRID.LAPTOP_XL.components)
    story.grids.LAPTOP_XL = `grid: ${rawStory.GRID.LAPTOP_XL.content}; grid-gap: ${rawStory.GRID_GAP.LAPTOP_XL}px; > .CmsWrapper{display:none} ${flexedClasses}`
  }

  // story.grids = {
  //   MOBILE_M: {
  //     components: rawStory.GRID.MOBILE_M.components.map(gridName => byGridName[gridName]).filter(_ => _),
  //     css: rawStory.GRID.MOBILE_M.content + ';\ngrid-gap:' + rawStory.GRID_GAP.MOBILE_M + 'px;'
  //   }
  // }

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

const flexClasses = (classes = []) => classes.map(className => `> .${className} {display: flex;}`).join(' ')
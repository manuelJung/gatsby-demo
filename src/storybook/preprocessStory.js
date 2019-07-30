import {store} from 'store/bootstrap'

export default async function preprocessStory (rawStory) {
  let story = {dict:{},grids:{},partialStateUpdates:[], components: []}
  if(!rawStory) return story

  const byGridName = rawStory.COMPONENTS.reduce((dict, next) => (dict[next.props.gridArea]=next.id) && dict, {})

  await Promise.all(rawStory.COMPONENTS.map(async component => {
    const request = getRequest(component.name)

    if(request){
      if(request.versionUpdate){
        const newProps = request.versionUpdate(component.props)
        component.props = newProps
      }
      if(request.preprocessProps){
        const newProps = await request.preprocessProps(component.props)
        component.props = newProps
      }
      if(request.createPartialStateUpdates){
        const partialStateUpdates = await request.createPartialStateUpdates(store, component.props)
        story.partialStateUpdates.push(...partialStateUpdates)
      }
      if(request.createContext){
        const context = await request.createContext(component.props)
        component.props.context = context
      }
    }

    story.dict[component.id] = component
  }))

  { // create component list by mobile grid order first (to prevent flickering)
    let mobileComponentsDict = {}
    let components = new Set()
    try {
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

    }
    catch(e) {
      console.log('WARNING (preprocessStory) unable to extract mobile compponents')
    }

    Object.keys(story.dict).forEach(id => {
      if(!mobileComponentsDict[id]) components.add(id)
    })
    story.components = Array.from(components)
  }

  story.grids.MOBILE_M = createCss(rawStory, 'MOBILE_M')
  story.grids.MOBILE_L = createCss(rawStory, 'MOBILE_L')
  story.grids.TABLET = createCss(rawStory, 'TABLET')
  story.grids.LAPTOP = createCss(rawStory, 'LAPTOP')
  story.grids.LAPTOP_L = createCss(rawStory, 'LAPTOP_L')
  story.grids.LAPTOP_XL = createCss(rawStory, 'LAPTOP_XL')

  return story
}

function createCss (rawStory, mediaSize) {
  if (!rawStory.GRID[mediaSize].active) {
    return null
  }
  const css = `grid: ${rawStory.GRID[mediaSize].content};`
            + `grid-gap: ${rawStory.GRID_GAP[mediaSize]}px;`
            + `> .CmsWrapper{display:none}`
            + flexClasses(rawStory.GRID[mediaSize].components)
  return css
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
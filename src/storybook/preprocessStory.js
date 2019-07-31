import {store} from 'store/bootstrap'

export default async function preprocessStory (rawStory) {
  let story = {dict:{},css:'',partialStateUpdates:[], components: [], raw:rawStory}
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

  story.css = createCss(rawStory)

  return story
}

function createCss(rawStory){
  const create = (grid,gap) => {
    if (!grid.active) return ''
    let css = `grid: ${grid.content};`
         + `grid-gap: ${gap}px;`
         + `> .CmsWrapper{display:none}`
         + flexClasses(grid.components)
    if(grid.abTest){
      let a = `grid: ${grid.abTest.a.content};`
            + `grid-gap: ${gap}px;`
            + `> .CmsWrapper{display:none}`
            + flexClasses(grid.abTest.a.components)
      let b = `grid: ${grid.abTest.b.content};`
            + `grid-gap: ${gap}px;`
            + `> .CmsWrapper{display:none}`
            + flexClasses(grid.abTest.b.components)
      css += `body.ab-mode-a & {${a}} body.ab-mode-b & {${b}} `
    }
    return css
  }

  let css = `${create(rawStory.GRID.MOBILE_M,rawStory.GRID_GAP.MOBILE_M)}`
            + `@media (min-width: 375px) {${create(rawStory.GRID.MOBILE_L,rawStory.GRID_GAP.MOBILE_L)}}`
            + `@media (min-width: 525px) {${create(rawStory.GRID.TABLET,rawStory.GRID_GAP.TABLET)}}`
            + `@media (min-width: 768px) {${create(rawStory.GRID.LAPTOP,rawStory.GRID_GAP.LAPTOP)}}`
            + `@media (min-width: 990px) {${create(rawStory.GRID.LAPTOP_L,rawStory.GRID_GAP.LAPTOP_L)}}`
            + `@media (min-width: 1200px) {${create(rawStory.GRID.LAPTOP_XL,rawStory.GRID_GAP.LAPTOP_XL)}}`
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
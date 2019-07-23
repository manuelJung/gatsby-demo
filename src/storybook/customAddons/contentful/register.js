import addons from '@storybook/addons'

addons.register('addons:rlx-contentful', api => {
  const channel = addons.getChannel()
  
  setTimeout(async () => {
    const component = {
      id:'123',
      name:'MagazineArticleTeaserByIdWidget',
      props:{
        gridArea:'mabid', 
        id: '4qswg0V6O6wEfp0EoKN1UH'
      }
    }

    const context = await fetchComponentContext(component)

    api.selectStory(context.kind, context.story)

    // channel.on(')
    setTimeout(() => {
      channel.emit('addon:rlx-contentful:set-component', component)
    }, 200)
    
  }, 1000)
})

function fetchComponentContext(component){
  const channel = addons.getChannel()
  return new Promise(resolve => {
    channel.once('addon:rlx-contentful:request-component-selector-response', resolve)
    channel.emit('addon:rlx-contentful:request-component-selector', component)
  })
}
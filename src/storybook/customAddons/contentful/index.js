import addons from '@storybook/addons'

// ---- inside iframe ----
const pathSelectors = {}

Promise.resolve()
.then(() => {
  const channel = addons.getChannel()

  channel.on('addon:rlx-contentful:request-component-selector', component => {
    if(!pathSelectors[component.name]){
      alert('#500 etwas ist passiert das nicht passieren sollte! Bitte diesen Fehler umgehend an Manu melden')
      throw new Error('500 context not found. Please implement "registerComponentSelector" in '+component.name)
    }
    const context = pathSelectors[component.name](component.props)
    if(!context){
      alert('#501 etwas ist passiert das nicht passieren sollte! Bitte diesen Fehler umgehend an Manu melden')
      throw new Error('501 context not found. Please revisit "registerComponentSelector" in '+component.name)
    }
    channel.emit('addon:rlx-contentful:request-component-selector-response', context)
  })
})

export const registerComponentSelector = (name, cb) => {
  pathSelectors[name] = cb
}


import addons from '@storybook/addons'

export default {
  addX(kind, storyFn) {
    const channel = addons.getChannel()

    const result = this.add(kind, context => {
      const story = storyFn(context)
        
      channel.emit('addon:contenful:set_component', story.type.componentName || story.type.name, story.props)

      return story
    })

    return result
  }
}
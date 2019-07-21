// @flow
import { storiesOf, setAddon } from '@storybook/react'
// import contentfullAddon from './customAddons/contentful'

document.isStorybook = true


// setAddon(contentfullAddon)


export default (name, context) => {
    const story = storiesOf(name, context)

    // add decorators
    // story
    //     .addDecorator(withTheme)
    //     .addDecorator(withStore)
    //     .addDecorator(withIntl)
    //     .addDecorator(withFontAwesome)
    //     .addDecorator(withStoryRouter())

    return story
}

// import withTheme from './decorators/withStore'
// import withStore from './decorators/withTheme'
// import withFontAwesome from './decorators/withFontAwesome'
// import withIntl from './decorators/withIntl'
import { storiesOf, setAddon } from '@storybook/react'
import contentfullAddon from './customAddons/contentful'
// import withStoryRouter from 'storybook-react-router'

document.isStorybook = true


setAddon(contentfullAddon)


export default (name, context) => {
    const story = storiesOf(name, context)

    // add decorators
    story
        // .addDecorator(withTheme)
        // .addDecorator(withStore)
        // .addDecorator(withIntl)
        // .addDecorator(withFontAwesome)
        // .addDecorator(withStoryRouter())

    return story
}

import { configure, addParameters } from '@storybook/react' 

const req = require.context('../theme/organisms', true, /.story.js/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

addParameters({
  options: {panelPosition: 'right'}
})
configure(loadStories, module)


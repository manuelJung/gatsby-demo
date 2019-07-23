import { configure, addParameters } from '@storybook/react' 

const req = require.context('./components', true, /.story.js/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

addParameters({
  options: {panelPosition: 'right'}
})
configure(loadStories, module)


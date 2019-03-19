import addons from '@storybook/addons'
import getParam from 'utils/getParameterByName'

addons.register('addon:contenful', api => {
  const channel = addons.getChannel()

  let result = {
    // id: getParam('cf-id'),
    id: 'abc',
    path: '',
    kind: '',
    name: '',
    search: '',
    props: {}
  }

  if(!result.id){
    result.id = Math.random().toString(36).substr(2, 9)
    api.setQueryParams({ 'cf-id': result.id })
  }

  channel.on('addon:contenful:set_component', (name, props) => {
    Object.assign(result, { name, props, search: window.location.search })
    console.log('cf SET_COMPONENT', result)
    window.parent.postMessage(result, '*')
  })
  
  api.onStory((path, kind) => {
    result = {...result, path, kind}
  })

})

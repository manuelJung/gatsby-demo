const {Converter} = require('showdown')



module.exports = function transformStory(story){
  if(!story) return {dict:{},grids:{}}

  story.COMPONENTS.forEach(component => {
    if(component.name === 'Text'){
      component.props.children = converter.makeHtml(component.props.children)
    }
    if(component.name === 'TextWithImage'){
      component.props.textProps.children = converter.makeHtml(component.props.textProps.children)
    }
    if(component.name === 'TextWithImageGallery'){
      component.props.textProps.children = converter.makeHtml(component.props.textProps.children)
    }
    if(component.name === 'TextWithEmbedly'){
      component.props.textProps.children = converter.makeHtml(component.props.textProps.children)
    }
  })

  const byGridName = story.COMPONENTS.reduce((dict, next) => (dict[next.props.gridArea]=next) && dict, {})

  return {
    dict: story.COMPONENTS.reduce((dict, next) => (dict[next.id]=next) && dict, {}),
    grids: {
      MOBILE_M: {
        components: story.GRID.MOBILE_M.components.map(gridName => byGridName[gridName].id),
        css: story.GRID.MOBILE_M.content + ';\ngrid-gap:' + story.GRID_GAP.MOBILE_M + 'px;'
      }
    }
  }
}

const converter = new Converter({
  tables: true,
  tablesHeaderId: true,
  literalMidWordUnderscores: true,
  extensions: [
    {
      type: 'output',
      regex: new RegExp('--(.+)--', 'g'),
      replace: '<i class="fa fa-$1"></i>'
    }
  ]
})

// return {
//   dict: {
//     '123456': {
//       name: 'MyComponent',
//       id: '123456',
//       props: { foo: "bar" }
//     }
//   },
//   grids: {
//     MOBILE_M: {
//       components: ['123456'],
//       css: `
//         grid: "MyComponent" auto
//             / 1fr;
//         grid-gap: 20px;
//       `
//     }
//   }
// }
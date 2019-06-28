
module.exports = function transformStory(story){
  if(!story) return {dict:{},grids:{}}

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
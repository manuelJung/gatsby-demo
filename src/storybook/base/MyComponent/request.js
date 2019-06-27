import useStorefinder from 'modules/storefinder/hooks/useStorefinder'

module.exports = async ({grapql, props, store}) => {
  let result = await useStorefinder.preload(store, props)
  console.log('---------', result)
  // const gq = await grapql(`{
  //   pages:allPages {
  //     nodes {
  //       title
  //       objectID
  //       urlKey
  //       story
  //     }
  //   }
  // }`)
  // return gq.data.pages.nodes.map(node => node.title).slice(0, 4)
}

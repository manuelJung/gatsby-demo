
// export const createContext = async props => {
//   const helper = createAlgoliaHelper('products', {
//     disjunctiveFactes: ['objectID']
//   })

//   props.objectIDs.forEach(id => helper.addDisjunctiveFacetRefinement('objectID', id))

//   const result = await helper.searchOnce()
//   const {hits} = result.content

//   const dict = hits.reduce((p,n) => (p[n.objectID]=n)&&p, {})

//   return { products: props.objectIDs.map(id => dict[id]) }
// }
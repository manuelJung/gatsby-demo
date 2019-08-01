import createAlgoliaHelper from 'utils/createAlgoliaHelper'

export const createContext = async props => {
  const helper = createAlgoliaHelper('products', {
    disjunctiveFacets: ['objectID'],
    attributesToHighlight: []
  })

  props.objectIds.forEach(id => helper.addDisjunctiveFacetRefinement('objectID', id))

  const result = await helper.searchOnce()
  const {hits} = result.content

  const dict = hits.reduce((p,n) => (p[n.objectID]=n)&&p, {})

  return { products: props.objectIds.map(id => dict[id]).filter(_ => _) }
}
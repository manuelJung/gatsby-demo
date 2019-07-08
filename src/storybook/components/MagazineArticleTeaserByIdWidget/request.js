import createAlgoliaHelper from 'utils/createAlgoliaHelper'

export const createContext = async ({props}) => {
  const helper = createAlgoliaHelper('magazine', {
    disjunctiveFacets: ['objectID'],
    attributesToHighlight: []
  })

  helper.addDisjunctiveFacetRefinement('objectID', props.magazineArticleId)

  const result = await helper.searchOnce()
  const {hits} = result.content

  return { article: hits[0] }
}
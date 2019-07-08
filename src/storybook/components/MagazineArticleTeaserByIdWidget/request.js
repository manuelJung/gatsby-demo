import createAlgoliaHelper from 'utils/createAlgoliaHelper'

export const createContext = async ({props}) => {
  const helper = createAlgoliaHelper('magazine', {
    disjunctiveFacets: ['objectID'],
    attributesToHighlight: [],
    attributesToRetrieve: ['categoryName', 'sponsoredArticle', 'teaserImageUrl', 'title']
  })

  helper.addDisjunctiveFacetRefinement('objectID', props.magazineArticleId)

  const result = await helper.searchOnce()
  const {hits} = result.content

  return { article: hits[0] }
}
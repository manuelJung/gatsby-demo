import createAlgoliaHelper from 'utils/createAlgoliaHelper'
import toBase64 from 'utils/toBase64'

export const createContext = async props => {
  const helper = createAlgoliaHelper('magazine', {
    disjunctiveFacets: ['objectID'],
    attributesToHighlight: [],
    attributesToRetrieve: ['categoryName', 'sponsoredArticle', 'teaserImageUrl', 'title']
  })

  helper.addDisjunctiveFacetRefinement('objectID', props.magazineArticleId)

  const result = await helper.searchOnce()
  const {hits} = result.content

  let base64 = await toBase64(props.src)

  return { article: hits[0], base64 }
}
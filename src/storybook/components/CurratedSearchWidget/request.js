import algoliasearchHelper from 'algoliasearch-helper'
import createAlgoliaHelper from 'utils/createAlgoliaHelper'

async function fetchHits(hpp, queryStrings, page) {
  const states = queryStrings.map(q => algoliasearchHelper.url.getStateFromQueryString(q))
  const helpers = states.map(state => {
    const helper = createAlgoliaHelper('products', {
      attributesToHighlight: [],
    })
    helper.setState(state)
    helper.setIndex('products')
    helper.setPage(page)
    return helper
  })
  const hitsPerPage = Math.ceil(hpp/states.length)

  const results = await Promise.all(helpers.map(helper => helper.searchOnce({hitsPerPage})))
  const hits = [].concat(...results.map(r => r.content.hits))
  const totalPages = 4 // TODO

  return [hits, totalPages]
}

export async function createContext ({props}) {
  const [hits, totalPages] = await fetchHits(props.hitsPerPage, props.queryStrings, 0)

  return {initialHits: hits, totalPages}
}
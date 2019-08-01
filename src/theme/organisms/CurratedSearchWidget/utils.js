import fetchCreateAlgoliaHelper from 'utils/fetchCreateAlgoliaHelper'

export async function fetchHits(hpp, queryStrings, page) {
  let createAlgoliaHelper = await fetchCreateAlgoliaHelper()
  createAlgoliaHelper = createAlgoliaHelper.default
  const states = queryStrings.map(q => createAlgoliaHelper.url.getStateFromQueryString(q))
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
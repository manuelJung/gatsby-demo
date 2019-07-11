// import fetchCreateAlgoliaHelper from 'utils/fetchCreateAlgoliaHelper'

export async function fetchHits(hpp, queryStrings, page) {
  // console.log('init')
  // const createAlgoliaHelper = await fetchCreateAlgoliaHelper()
  // console.log('first')
  // const states = queryStrings.map(q => createAlgoliaHelper.url.getStateFromQueryString(q))
  // console.log('second')
  // const helpers = states.map(state => createAlgoliaHelper('products', {
  //   attributesToHighlight: [],
  //   hitsPerPage: Math.ceil(hpp/states.length)
  // }).setState(state).setPage(page))

  // console.log('third')

  // const results = await Promise.all(helpers.map(helper => helper.searchOnce()))
  // const hits = [].concat(...results.map(r => r.content.hits))
  // const totalPages = 4 // TODO

  // console.log('last')
  const hits = []
  const totalPages = 4

  return [hits, totalPages]
}
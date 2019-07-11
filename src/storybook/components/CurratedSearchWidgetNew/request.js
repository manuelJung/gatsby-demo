// import {fetchHits} from './utils'

export async function createContext ({props}) {
  // const [hits, totalPages] = await fetchHits(props.hitsPerPage, props.initialQueryStrings, 0)
  console.log('createC')
  const hits = []
  const totalPages = 4

  return {initialHits: hits, totalPages}
}
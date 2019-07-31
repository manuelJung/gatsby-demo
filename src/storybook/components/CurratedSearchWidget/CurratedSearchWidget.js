// @flow
import * as React from 'react'
import {fetchHits} from './utils'

type Props = {
  hitsPerPage: number,
  queryStrings: string[],
  context: {
    initialHits: any[],
    totalPages: number
  }
}

export default function CurratedSearchWidget ({hitsPerPage, queryStrings, context}:Props) {
  const [hits, page, , setPage] = useHits(hitsPerPage, queryStrings, context.initialHits, context.totalPages)

  return (
    <div>
      {hits.map(hit => <div key={hit.objectID}>- {hit.objectID}</div>)}

      <button onClick={() => setPage(page+1)}>next</button>
    </div>
  )
}


function useHits (hpp, queryStrings, initialHits, initialTotalPages) {
  const [totalPages, setTotalPages] = React.useState(initialTotalPages)
  const [hits, setHits] = React.useState(initialHits)
  const [page, setPage] = React.useState(0)
  const isFirstRender   = React.useRef(true)

  // do something
  React.useEffect(() => {
    if(isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    fetchHits(hpp, queryStrings, page).then(([hits, totalPages]) => {
      setTotalPages(totalPages)
      setHits(hits)
    })
  }, [page, isFirstRender.current])


  return [hits, page, totalPages, setPage]
}
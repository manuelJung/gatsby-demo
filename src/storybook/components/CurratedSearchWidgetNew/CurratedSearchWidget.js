// @flow
import * as React from 'react'
import styled from 'styled-components'
import {fetchHits} from './utils'

type Props = {
  hitsPerPage: number,
  initialQueryStrings: string[],
  context: {
    initialHits: any[],
    totalPages: number
  }
}

export default function CurratedSearchWidget ({hitsPerPage, initialQueryStrings, context}:Props) {
  const [hits, page, totalPages, setPage] = useHits(hitsPerPage, initialQueryStrings, context.initialHits, context.totalPages)
  return (
    <div>
      {hits.map(hit => <div key={hit.objectID}>- {hit.objectID}</div>)}
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
    if(isFirstRender.current) return

    fetchHits(hpp, queryStrings, page).then(([hits, totalPages]) => {
      setTotalPages(totalPages)
      setHits(hits)
    })
  }, [page, isFirstRender.current])

  isFirstRender.current = false

  return [hits, page, totalPages, setPage]
}
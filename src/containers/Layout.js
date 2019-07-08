// @flow
import * as React from 'react'
import './layout.css'
import Header from './Header'
import Redux from './Redux'

type Props = {
  children: React.Node
}

export default function Layout ({children}) {
  return (
    <Redux>
      <Header />
      {children}
    </Redux>
  )
}
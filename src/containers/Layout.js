// @flow
import * as React from 'react'
import './layout.css'
import Header from './Header'
import Footer from './Footer'
import Redux from './Redux'

type Props = {
  children: React.Node
}

export default function Layout ({children, partialStateUpdates}:Props) {
  return (
    <Redux partialStateUpdates={partialStateUpdates}>
      <Header />
      {children}
      <Footer />
    </Redux>
  )
}
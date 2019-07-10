// @flow
import * as React from 'react'
import './layout.css'
import Header from './Header'
import Footer from './Footer'
import Redux from './Redux'

type Props = {
  children: React.Node
}

export default function Layout ({children}:Props) {
  return (
    <Redux>
      <Header />
      {children}
      <Footer />
    </Redux>
  )
}
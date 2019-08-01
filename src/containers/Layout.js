// @flow
import * as React from 'react'
import { createGlobalStyle } from 'styled-components'
import Header from 'theme/_Header'
import Footer from 'theme/_Footer'
import Redux from './Redux'

type Props = {
  children: React.Node,
  partialStateUpdates?: mixed[]
}

export default function Layout ({children, partialStateUpdates}:Props) {
  return (
    <Redux partialStateUpdates={partialStateUpdates}>
      <GlobalStyle />
      <Header />
      {children}
      <Footer />
    </Redux>
  )
}

const GlobalStyle = createGlobalStyle`

  html, body {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: Montserrat,Helvetica,Arial,sans-serif;
    font-size: 16px;
    line-height: 1.58;
    color: #555;
    background-color: #fff;
    box-sizing: border-box;
  }

  strong {
    color: rgb(85, 85, 85);
    font-weight: 700;
  }

  a {
    color: #993452;
    text-decoration: none
  }

  h4, .h4 { font-weight: bold; }

  a:focus,a:hover {
    color: #993452;
    text-decoration: none
  }

  a:focus {
    outline-style: dotted;
    outline: 5px auto -webkit-focus-ring-color;
    outline-offset: -2px
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 500;
    line-height: 1.1;
  }

  h1, h2, h3 {
    margin-top: 20px;
    margin-bottom: 10px;
  }

  h4, h5, h6 {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee
  }

  @media (max-width: 767px) {
    .h1,.h2,h1,h2 {
        font-size:18px
    }
  }

  @media (min-width: 768px) {
    .h1,.h2,h1,h2 {
        font-size:22px
    }
  }

  @media (min-width: 1200px) {
    .h1,.h2,h1,h2 {
        font-size:26px
    }
  }

  @media (max-width: 767px) {
    .h3,h3 {
        font-size:16px
    }
  }

  @media (min-width: 768px) {
    .h3,h3 {
        font-size:20px
    }
  }

  @media (min-width: 1200px) {
    .h3,h3 {
        font-size:24px
    }
  }

  @media (max-width: 767px) {
    .h5,h5 {
        font-size:10px
    }
  }

  @media (min-width: 768px) {
    .h5,h5 {
        font-size:12px
    }
  }

  @media (min-width: 1200px) {
    .h5,h5 {
        font-size:16px
    }
  }

`
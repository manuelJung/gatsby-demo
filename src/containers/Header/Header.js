// @flow
import * as React from 'react'
import { useStaticQuery, graphql } from "gatsby"

export default function Header () {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      navItems: allNavigation {
        nodes {
          label
          link
          dropdown {
            label
            link
            displayInMenu
            children {
              label
              link
              displayInMenu
              children {
                label
                link
                displayInMenu
              }
            }
          }
        }
      }
    }
  `)

  return (
    <div className='header'>
      HEADER
      <ul>
        {data.navItems.nodes.map(node =>
          <li key={node.label}>{node.label}</li>
        )}
      </ul>
    </div>
  )
}
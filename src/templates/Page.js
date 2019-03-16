import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../Layout'

export default (props) => {
  return (
    <Layout>
      PAGE {props.data.contentfulPage.slug}
      <br/>
    </Layout>
  )
}

export const query = graphql`
  query ($slug: String!) {
    contentfulPage(slug: {eq: $slug}){
      slug
      content {
        content
      }
    }
  }
`
import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../Layout'

export default (props) => {
  console.log(props)
  return (
    <Layout>
      PAGE {props.data.contentfulProductCategories.slug}
      <br/>
    </Layout>
  )
}

export const query = graphql`
  query ($slug: String!) {
    contentfulProductCategories(slug: {eq: $slug}){
      slug
    }
  }
`
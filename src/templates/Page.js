import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../Layout'

export default (props) => {
  console.log(props)
  return (
    <Layout>
      PAGE {props.data.category.name}
      <br/>
    </Layout>
  )
}

export const query = graphql`
  query ($slug:String!, $lv1:String, $lv2:String) {
    category:contentfulProductCategories(slug: {eq: $slug}){
      name
    }
    tree_lv2: contentfulProductCategories(slug: {eq: $lv1}){
      name,
      childs {
        name
      }
    }
    tree_lv3: contentfulProductCategories(slug: {eq: $lv2}){
      name,
      childs {
        name
      }
    }
  }
`
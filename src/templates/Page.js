import React from 'react'
import Story from 'storybook/Story'
import { Link } from "gatsby"
import { graphql } from "gatsby"
import Layout from 'containers/Layout'

export default (props) => {

  return (
    <Layout>
      <Story story={props.data.page.story}/>
    </Layout>
  )
}

export const query = graphql`
  query($urlKey: String!) {
    page (urlKey: {eq: $urlKey}){
      story
    }
  }
`

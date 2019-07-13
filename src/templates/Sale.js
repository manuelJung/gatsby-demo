import React from 'react'
import Layout from 'containers/Layout'
import Story from 'storybook/Story'
import { graphql } from "gatsby"

export default (props) => {

  return (
    <Layout>
      <h1>Sale Page</h1>
      <Story story={props.data.staticBlock.story}/>
    </Layout>
  )
}

export const query = graphql`
  query {
    staticBlock (id: {eq: "2Uw8yUNd28CcyeMyUqOYgw"}) {
      story
    }
  }
`

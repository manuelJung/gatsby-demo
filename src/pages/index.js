import React from 'react'
import Layout from 'containers/Layout'
import Story from 'storybook/Story'
import { graphql } from "gatsby"

export default (props) => {

  return (
    <Layout>
      <Story story={props.data.staticBlock.story}/>
    </Layout>
  )
}

export const query = graphql`
  query {
    staticBlock (id: {eq: "AeYMCJSjAs84WsQcA84mO"}) {
      story
    }
  }
`

import React from 'react'
import Layout from 'containers/Layout'
import Story from 'storybook/Story'
import { Link } from "gatsby"
import { graphql } from "gatsby"

export default (props) => {

  return (
    <Layout>
      <h1>Page</h1>
      <p>
        <Link to='page/aktuelle-Trends'>trends</Link>
        -
        <Link to='page/looks'>looks</Link>
      </p>
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

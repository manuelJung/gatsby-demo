import React from 'react'
import Redux from 'containers/Redux'
import Story from 'storybook/Story'
import { Link } from "gatsby"
import { graphql } from "gatsby"
import Layout from 'containers/Layout'

export default (props) => {
  // console.log(props)

  return (
    <Layout>
      <h1>Page</h1>
      <p>
        <Link to='page/aktuelle-Trends'>trends</Link>
        -
        <Link to='page/looks'>looks</Link>
      </p>
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

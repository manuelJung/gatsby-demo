import React from 'react'
import Layout from 'containers/Layout'
import Story from 'storybook/Story'
import { graphql } from "gatsby"

export default (props) => {

  return (
    <Layout>
      <p/>
      <Story story={props.data.category.story}/>
    </Layout>
  )
}

export const query = graphql`
  query($id:String!) {
    category (id: {eq: $id}) {
      story
    }
  }
`

import React from 'react'
import Redux from 'containers/Redux'
import Header from 'containers/Header'
import Story from 'storybook/Story'
import { Link } from "gatsby"
import { graphql } from "gatsby"

export default (props) => {

  return (
    <Redux partialStateUpdates={null /*props.data.page.story.partialStateUpdates*/}>
      <Header>
        <h1>Page</h1>
        <p>
          <Link to='page/aktuelle-Trends'>trends</Link>
          -
          <Link to='page/looks'>looks</Link>
        </p>
        <Story story={props.data.staticBlock.story}/>
      </Header>
    </Redux>
  )
}

export const query = graphql`
  query {
    staticBlock (id: {eq: "AeYMCJSjAs84WsQcA84mO"}) {
      story
    }
  }
`

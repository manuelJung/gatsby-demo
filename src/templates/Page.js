import React from 'react'
import Redux from 'containers/Redux'
import Story from 'storybook/Story'
import { Link } from "gatsby"
import { graphql } from "gatsby"

export default (props) => {
  // console.log(props)

  return (
    <Redux partialStateUpdates={null /*props.data.page.story.partialStateUpdates*/}>
      <h1>Page</h1>
      <p>
        <Link to='page/aktuelle-Trends'>trends</Link>
        -
        <Link to='page/looks'>looks</Link>
      </p>
      <Story story={props.data.page.story}/>
    </Redux>
  )
}

export const query = graphql`
  query($urlKey: String!) {
    page (urlKey: {eq: $urlKey}){
      story
    }
  }
`

import React from 'react'
import Redux from 'containers/Redux'
import Story from 'storybook/Story'
import { Link } from "gatsby"

export default (props) => {
  const {partialStateUpdates, story, storyContext} = props.pageContext
  console.log(props)
  return (
    <Redux partialStateUpdates={partialStateUpdates}>
      <h1>Page</h1>
      <p>
        <Link to='page/aktuelle-Trends'>trends</Link>
        -
        <Link to='page/looks'>looks</Link>
      </p>
      <Story story={story} storyContext={storyContext}/>
    </Redux>
  )
}

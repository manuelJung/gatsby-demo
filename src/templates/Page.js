import React from 'react'
import Redux from 'containers/Redux'
import MyComponent from 'storybook/base/MyComponent'
import { Link } from "gatsby"

export default (props) => {
  console.log(props)
  return (
    <Redux partialStateUpdates={props.pageContext.partialStateUpdates}>
      <h1>Page</h1>
      <p>
        <Link to='page/aktuelle-Trends'>trends</Link>
        -
        <Link to='page/looks'>looks</Link>
      </p>
      <MyComponent initialProps={props.pageContext.storyRequests['123456']}/>
    </Redux>
  )
}

import React from 'react'
import Redux from 'containers/Redux'
import MyComponent from 'storybook/base/MyComponent'

export default (props) => {
  console.log(props)
  return (
    <Redux partialStateUpdates={props.pageContext.partialStateUpdates}>
      <h1>Page</h1>
      <MyComponent />
    </Redux>
  )
}

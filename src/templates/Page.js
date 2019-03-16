import React from 'react'

export default (props) => {
  console.log(props)
  return (
    <div id='page'>
      PAGE {window.location.pathname}
    </div>
  )
}
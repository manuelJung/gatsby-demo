// @flow
import * as React from 'react'
// import Img from 'gatsby-image'



export default function Image ({alt, src, label /*, context: {fluid}*/}) {
  return (
    <div className='Image'>
      <div className='image-wrapper'>
        {/* {fluid && <Img fluid={fluid} alt={alt}/>} */}
        {/* {fluid || <img src={src} alt={alt}/>} */}
        <img src={src} alt={alt}/>
      </div>
      {label && <div className='label'>{label}</div>}
    </div>
  )
}
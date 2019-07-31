// @flow
import * as React from 'react'
import {Link} from 'gatsby'

export default React.forwardRef(function MaybeLink (props, ref) {
  const isRelativeLink = props.to[0] === '/'
  const isExternalLink = props.to.startsWith('http')
  const isNoFollowLink = props.to.startsWith('nofollow:')
  const isAnchorLink = isRelativeLink && !!props.to.match(/#[^=^&]*$/)

  let {to, children, ...aProps} = props

  if(isNoFollowLink){
    return <a ref={ref} {...aProps} rel='nofollow noopener noreferrer' href={props.to.replace('nofollow:','')} target='_blank' >{children}</a>
  }

  if(isExternalLink){
    return <a ref={ref} {...aProps} rel="noopener noreferrer" href={props.to} target='_blank'>{children}</a>
  }

  if(isAnchorLink){
    return <a ref={ref} {...aProps} href={props.to}>{children}</a>
  }

  if(!isRelativeLink){
    return <a ref={ref} {...aProps} href={props.to}>{children}</a>
  }

  return <Link ref={ref} {...props}/>
})
// @flow
import * as React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql, Link } from "gatsby"

export default function Footer () {
  const gq = useStaticQuery(graphql`
    query FooterQuery {
      navItems: allCategory(filter: {parentId:{eq:null}} ) {
        nodes {
          label
          link
        }
      }
      links:staticBlock(identifier:{eq:"Layout_Footer_GenericNavigationItems"}){
        content
      }
      newsletter:staticBlock(identifier:{eq:"Layout_Footer_NewsletterSubscription"}){
        content
      }
      social:staticBlock(identifier:{eq:"Layout_Footer_SocialLinks"}){
        content
      }
    }
  `)
  return (
    <Wrapper className='Footer'>
      <div className='links' dangerouslySetInnerHTML={{__html: gq.links.content}}/>
      <div className='shop-links'>
        {gq.navItems.nodes.map(item => (
          <Link key={item.link} to={item.link}>
            {item.label}<br/>
          </Link>
        ))}
      </div>
      <div className='newsletter' dangerouslySetInnerHTML={{__html: gq.newsletter.content}}/>
      <div className='social' dangerouslySetInnerHTML={{__html: gq.social.content}}/>
    </Wrapper>
  )
}

const Wrapper = styled.div``
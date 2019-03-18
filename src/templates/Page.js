import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../Layout'
import styled from 'styled-components'

export default (props) => {
  return (
    <Layout>
      <Wrapper>
        <aside className='sidebar'>
          <ul>
            {(props.data.tree_lv2.childs||[]).map(row => <li key={row.name}>{row.name}</li>)}
          </ul>
        </aside>
        <section className='content'>
          My Content
        </section>
      </Wrapper>
    </Layout>
  )
}

export const query = graphql`
  query ($slug:String!, $lv1:String, $lv2:String) {
    category:contentfulProductCategories(slug: {eq: $slug}){
      name
    }
    tree_lv2: contentfulProductCategories(slug: {eq: $lv1}){
      name,
      childs {
        name
      }
    }
    tree_lv3: contentfulProductCategories(slug: {eq: $lv2}){
      name,
      childs {
        name
      }
    }
  }
`

const Wrapper = styled.div`
  display: flex;

  > .sidebar {
    width: 200px;
    background: lightgrey;
    margin-right: 10px;
  }

  > .content {
    flex: 1;
    background: steelblue;
  }
`
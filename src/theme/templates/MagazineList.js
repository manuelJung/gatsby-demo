import React from 'react'
import Layout from 'containers/Layout'
import Story from 'storybook/Story'
import { graphql, Link } from "gatsby"
import {getMagazineListPath} from 'routes'

export default ({data, pageContext}) => {
  const {story} = data.staticBlock
  const {pageInfo, nodes} = data.allMagazineArticle
  const {page, category} = pageContext
  return (
    <Layout>
      {story && <Story story={story}/>}

      <div>
        {pageInfo.hasPreviousPage && <Link to={getMagazineListPath(page-1, category)}>prev</Link>}
        --
        {pageInfo.hasNextPage && <Link to={getMagazineListPath(page+1, category)}>next</Link>}
      </div>

      <div>
        {nodes.map(node => (
          <div key={node.urlKey}>{node.categoryName} - {node.urlKey}</div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($noStory: Boolean! $hpp: Int! $skip: Int!, $categoryRegex: String!) {
    staticBlock (id: {eq: "1s8k04g0360kAAGWCUGQ8w"}) {
      story @skip(if: $noStory)
    }
    allMagazineArticle(limit:$hpp skip:$skip filter: {categoryName: {regex: $categoryRegex}}) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      nodes {
        urlKey
        categoryName
      }
    }
  }
`

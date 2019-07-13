import React from 'react'
import Layout from 'containers/Layout'
import Story from 'storybook/Story'
import { graphql, Link } from "gatsby"

export default ({data, pageContext}) => {
  const {story} = data.staticBlock
  return (
    <Layout>
      {story && <Story story={story}/>}

      <div>
        {pageContext.prevUrl && <Link to={pageContext.prevUrl}>prev</Link>}
        --
        {pageContext.nextUrl && <Link to={pageContext.nextUrl}>next</Link>}
      </div>

      <div>
        {data.allMagazineArticle.nodes.map(node => (
          <div key={node.urlKey}>{node.urlKey}</div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($noStory: Boolean! $hpp: Int! $skip: Int!) {
    staticBlock (id: {eq: "1s8k04g0360kAAGWCUGQ8w"}) {
      story @skip(if: $noStory)
    }
    allMagazineArticle(limit:$hpp skip:$skip) {
      pageInfo {
        pageCount
      }
      nodes {
        urlKey
      }
    }
  }
`

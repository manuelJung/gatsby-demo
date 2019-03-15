import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({data}) => (
  <Layout>
    {console.log(data)}
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Hello World</h1>
  </Layout>
)

export const query = graphql`
  query {
    site {
      siteMetadata {
        test {
          name
        }
      }
    }
  }
`

export default IndexPage

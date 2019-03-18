module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    test: {
      name: 'TEST_PAGE'
    }
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    './plugins/algolia',
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `t1jhzsycxuhp`,
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: '79033c046d72767d5c834cbc256baace028b0697a0e84bc4f0dd459b15352e8e',
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Oswald`,
            subsets: [`latin`],
          },
          {
            family: `Open Sans`,
            variants: [`400`, `700`]
          },
          {
            family: "Roboto",
            variants: [
              "400",
              "400i",
              "700",
              "700i"
            ],
            subsets: [
              "latin-ext"
            ]
          },
          // {
          //   resolve: `gatsby-source-graphql`,
          //   options: {
          //     fieldName: `cms`,
          //     url: "https://api-euwest.graphcms.com/v1/cjta3wklb2dew01dn8hacoei7/master",
          //     typeName: `GraphCMS`,
          //     refetchInterval: 60,
          //   },
          // }
        ],
      },
    }
  ],
}

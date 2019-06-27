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
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    './plugins/algolia',
    `gatsby-plugin-flow`,
    // {
    //   resolve: `gatsby-source-contentful`,
    //   options: {
    //     spaceId: `t1jhzsycxuhp`,
    //     // Learn about environment variables: https://gatsby.dev/env-vars
    //     accessToken: '79033c046d72767d5c834cbc256baace028b0697a0e84bc4f0dd459b15352e8e',
    //   },
    // },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    }
  ],
}

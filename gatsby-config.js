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
    `gatsby-plugin-flow`,
    `gatsby-plugin-catch-links`,
    'gatsby-plugin-resolve-src',
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `rgb(153, 52, 82)`,
        // Disable the loading spinner.
        showSpinner: false,
      },
    },
    {
      resolve: "gatsby-plugin-preconnect",
      options: {
        domains: [
          "https://res.cloudinary.com"
        ]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
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
            family: `Montserrat`
          },
          {
            family: `Merriweather`
          }
        ],
      },
    },
  ],
}


const app_mode = process.env.APP_MODE || process.env.GATSBY_APP_MODE || process.env.STORYBOOK_APP_MODE
const config = require(`./${app_mode}`).default
export default config
import {store} from 'store/bootstrap'
import { GraphQLJSON } from "gatsby/graphql"
import {fetchHits} from './algolia'
import preprocessStory from 'storybook/preprocessStory'
var crypto = require('crypto')
var path = require('path')
var requestPaths = require('./src/storybook/requests')
var reducer = require('./src/modules/storefinder/reducer')

export async function createPages ({graphql, actions}) {
  // create category pages
  const gq = await graphql(`{
    pages:allPage {
      nodes {
        urlKey
      }
    }
  }`)


  gq.data.pages.nodes.forEach(page => {
    actions.createPage({
      path: `page/${page.urlKey}`,
      component: path.resolve(__dirname, 'src/templates/Page.js'),
      context: {urlKey: page.urlKey}
    })
  })
}





export const createSchemaCustomization = ({ actions, cache }) => {
  const { createFieldExtension, createTypes } = actions
  createFieldExtension({
    name: 'Story',
    extend: () => ({
      resolve: async (source, args, context, info) => {
        // const cached = await cache.get(source.objectID)
        // if(cached) return cached
        if(!source.story) return null
        const story = preprocessStory(source.story, {cache})
        // await cache.set(source.objectID, story)
        return story
      }
    })
  })

  const typeDefs = `
    type Page implements Node {
      story: JSON @Story
    }
  `
  createTypes(typeDefs)
}





export const sourceNodes = async ({ actions }) => {
  const { createNode } = actions

  const [pages] = await Promise.all([
    fetchHits('pages')
  ])

  pages.forEach(page => {
    let meta = {}
    const json = JSON.stringify(page)

    meta.id = page.objectID
    meta.parent = null
    meta.children = []
    meta.internal = {
      type: 'Page',
      contentDigest: crypto.createHash(`md5`).update(json).digest(`hex`),
      mediaType: `application/json`,
      content: json,
      description: `Page (${page.title})`
    }

    createNode({...page, ...meta})
  })
}

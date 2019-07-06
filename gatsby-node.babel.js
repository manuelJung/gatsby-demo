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
  // const gq = await graphql(`{
  //   pages:allPages {
  //     nodes {
  //       title
  //       objectID
  //       urlKey
  //       story
  //     }
  //   }
  // }`)

  // // extract storybook requests
  // let requests = {}
  // let pending = []
  // gq.data.pages.nodes.slice(0,1).forEach(page => {
  //   const story = JSON.parse(page.story)
  //   Object.values(story.dict).forEach(component => {
  //     const path = requestPaths[component.name]
  //     if(!path) return 
  //     const request = require(path)
  //     pending.push([component.id, request({graphql, props:component.props, store})])
  //   })
  // })

  // const pendingResolved = await Promise.all(pending.map(row => row[1]))
  // pendingResolved.forEach((result,i) => {requests[pending[i][0]]=result})

  // gq.data.pages.nodes.forEach(page => {
  //   const story = JSON.parse(page.story)
  //   const partialStateUpdates = []
  //   const storyContext = {}

  //   // get requests
  //   Object.keys(story.dict).forEach(id => {
  //     if(requests[id] && requests[id].partialStateUpdates){
  //       partialStateUpdates.push(...requests[id].partialStateUpdates)
  //     }
  //     if(requests[id] && requests[id].context){
  //       storyContext[id] = requests[id].context
  //     }
  //   })

  //   actions.createPage({
  //     path: `page/${page.urlKey}/`,
  //     component: path.resolve(__dirname, 'src/templates/Page.js'),
  //     context: { story, partialStateUpdates, storyContext }
  //   })
  // })
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

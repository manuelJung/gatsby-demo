import {store} from 'store/bootstrap'
import { GraphQLJSON } from "gatsby/graphql"
import {fetchHits} from './algolia'
import preprocessStory from 'storybook/preprocessStory'
import crypto from 'crypto'
import path from 'path'

export async function createPages ({graphql, actions}) {
  // create category pages
  const gq = await graphql(`{
    pages:allPage {
      nodes {
        urlKey
      }
    }
    magazineArticles:allMagazineArticle {
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

  gq.data.magazineArticles.nodes.forEach(article => {
    actions.createPage({
      path: `magazin/a/${article.urlKey}`,
      component: path.resolve(__dirname, 'src/templates/MagazineArticle.js'),
      context: {urlKey: article.urlKey}
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
    type MagazineArticle implements Node {
      story: JSON @Story
    }
  `
  createTypes(typeDefs)
}





export const sourceNodes = async ({ actions }) => {
  const { createNode } = actions

  const [pages, magazineArticles] = await Promise.all([
    fetchHits('pages'),
    fetchHits('magazine')
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

  magazineArticles.forEach(article => {
    let meta = {}
    const json = JSON.stringify(article)

    // fix types
    if(typeof article.disableLocaleFallback === 'string') article.disableLocaleFallback = false
    if(typeof article.featuredInDropdownMenu === 'string') article.featuredInDropdownMenu = false
    if(typeof article.featuredOnHomepage === 'string') article.featuredOnHomepage = false
    if(typeof article.relatedProducts === 'string') article.relatedProducts = []
    if(typeof article.relatedMagazineArticles === 'string') article.relatedMagazineArticles = []
    if(typeof article.metaRobotsNoindex === 'string') article.metaRobotsNoindex = false
    if(typeof article.story === 'string') article.story = null
    if(typeof article.useStory === 'string') article.useStory = false
    if(typeof article.authors === 'string') article.authors = []

    meta.id = article.objectID
    meta.parent = null
    meta.children = []
    meta.internal = {
      type: 'MagazineArticle',
      contentDigest: crypto.createHash(`md5`).update(json).digest(`hex`),
      mediaType: `application/json`,
      content: json,
      description: `MagazineArticle (${article.title})`
    }

    createNode({...article, ...meta})
  })
}

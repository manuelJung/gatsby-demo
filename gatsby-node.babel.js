import {store} from 'store/bootstrap'
import { GraphQLJSON } from "gatsby/graphql"
import {fetchHits, fetchNavigation, fetchCategories} from './algolia'
import preprocessStory from 'storybook/preprocessStory'
import crypto from 'crypto'
import path from 'path'

const createMagazineListContext = (page, max, category) => ({
  page: page,
  noStory: Boolean(category) || page !== 0,
  hpp: 20,
  skip: 20 * page,
  category: category,
  categoryRegex: category ? `/${category}/` : "/.*/"
})

export async function createPages ({graphql, actions}) {
  
  const gq = await graphql(`{
    pages:allPage {
      nodes {
        urlKey
      }
    }
    magazineArticles:allMagazineArticle {
      nodes {
        urlKey
        storyComponentPaths
      }
    }
    categories:allCategory {
      nodes {
        objectID
        link
      }
    }
    magazineArticlesByCategory:allMagazineArticle {
      group(field: categoryName) {
        category:fieldValue
        nodes {
          urlKey
        }
      }
    }
  }`)

  gq.data.magazineArticlesByCategory.group.forEach(group => {
    const numPages = Math.ceil(group.nodes.length/20)
    const category = group.category.toLowerCase()
    actions.createPage({
      path: `/magazin/${category}`,
      component: path.resolve(__dirname, 'src/templates/MagazineList.js'),
      context: createMagazineListContext(0, numPages, group.category)
    })
    Array(numPages).fill().forEach((_,i) => i !== 0 && actions.createPage({
      path: `/magazin/${category}/page/${i+1}`,
      component: path.resolve(__dirname, 'src/templates/MagazineList.js'),
      context: createMagazineListContext(i, numPages, group.category)
    }))
  })

  { // magazine article lists
    const numPages = Math.ceil(gq.data.magazineArticles.nodes.length / 20)
    actions.createPage({
      path: `/magazin`,
      component: path.resolve(__dirname, 'src/templates/MagazineList.js'),
      context: createMagazineListContext(0, numPages)
    })
    Array(numPages).fill().forEach((_,i) => i !== 0 && actions.createPage({
      path: `/magazin/page/${i+1}`,
      component: path.resolve(__dirname, 'src/templates/MagazineList.js'),
      context: createMagazineListContext(i, numPages)
    }))
  }

  gq.data.pages.nodes.forEach(page => {
    actions.createPage({
      path: `page/${page.urlKey}`,
      component: path.resolve(__dirname, 'src/templates/Page.js'),
      context: {urlKey: page.urlKey}
    })
  })

  gq.data.magazineArticles.nodes.forEach(article => {
    if(article.urlKey === 'kolumne-dunja-wermter-2') return
    actions.createPage({
      path: `magazin/a/${article.urlKey}`,
      component: path.resolve(__dirname, 'src/templates/MagazineArticle.js'),
      context: {urlKey: article.urlKey},
      modules: article.storyComponentPaths
    })
  })

  gq.data.categories.nodes.forEach(node => actions.createPage({
    path: node.link,
    component: path.resolve(__dirname, 'src/templates/Category.js'),
    context: {id: node.objectID}
  }))
}

export const onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/product/)) {
    page.matchPath = "/product/*"
    createPage(page)
  }
}





export const createSchemaCustomization = ({ actions, cache }) => {
  const { createFieldExtension, createTypes } = actions
  createFieldExtension({
    name: 'Story',
    extend: () => ({
      resolve: async (source, args, context, info) => {
        if(!source.story) return null
        const story = preprocessStory(source.story)
        return story
      }
    })
  })

  createFieldExtension({
    name: 'StoryComponentPaths',
    extend: () => ({
      resolve: async (source, args, context, info) => {
        if(!source.story) return null
        return source.story.COMPONENTS
          .reduce((p,{name}) => {
            p[name] = path.resolve(__dirname, `src/storybook/components/${name}.js`)
            return p
          }, {})
      }
    })
  })

  const typeDefs = `
    type Page implements Node {
      story: JSON @Story
      storyComponentPaths: JSON @StoryComponentPaths
    }
    type MagazineArticle implements Node {
      story: JSON @Story
      storyComponentPaths: JSON @StoryComponentPaths
    }
    type StaticBlock implements Node {
      story: JSON @Story
      storyComponentPaths: JSON @StoryComponentPaths
    }
    type Category implements Node {
      story: JSON @Story
      storyComponentPaths: JSON @StoryComponentPaths
    }
  `
  createTypes(typeDefs)
}





export const sourceNodes = async ({ actions }) => {
  const { createNode } = actions

  const [pages, magazineArticles, staticBlocks, navigation, categories] = await Promise.all([
    fetchHits('pages'),
    fetchHits('magazine'),
    fetchHits('staticblocks'),
    fetchNavigation(),
    fetchCategories()
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

  staticBlocks.forEach(block => {
    let meta = {}
    const json = JSON.stringify(block)

    meta.id = block.objectID
    meta.parent = null
    meta.children = []
    meta.internal = {
      type: 'StaticBlock',
      contentDigest: crypto.createHash(`md5`).update(json).digest(`hex`),
      mediaType: `application/json`,
      content: json,
      description: `StaticBlock (${block.title})`
    }

    createNode({...block, ...meta})
  })

  navigation.forEach(nav => {
    let meta = {}
    const json = JSON.stringify(nav)

    meta.id = nav.id
    meta.parent = null
    meta.children = []
    meta.internal = {
      type: 'Navigation',
      contentDigest: crypto.createHash(`md5`).update(json).digest(`hex`),
      mediaType: `application/json`,
      content: json,
      description: `Navigation (${nav.label})` 
    }

    createNode({...nav, ...meta})
  })

  categories.forEach(cat => {
    // resolve conflicts
    cat.useStory = Boolean(cat.useStory)
    cat.useEnhancedStory = Boolean(cat.useEnhancedStory)
    cat.hideProducts = Boolean(cat.hideProducts)
    cat.categoryLevel = cat.categoryLevel || null
    cat.story = cat.story || null
    cat.productTags = cat.productTags || []

    // relations
    cat.parentCategory___NODE = cat.parentId
    cat.childCategories___NODE = cat.childIds


    let meta = {}
    const json = JSON.stringify(cat)

    meta.id = cat.objectID
    meta.parent = null
    meta.children = []
    meta.internal = {
      type: 'Category',
      contentDigest: crypto.createHash(`md5`).update(json).digest(`hex`),
      mediaType: `application/json`,
      content: json,
      description: `Category (${cat.label})` 
    }

    createNode({...cat, ...meta})
  })
}

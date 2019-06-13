module.exports = async (grapql) => {
  const gq = await grapql(`{
    pages:allPages {
      nodes {
        title
        objectID
        urlKey
        story
      }
    }
  }`)
  return gq.data.pages.nodes.map(node => node.title).slice(0, 4)
}
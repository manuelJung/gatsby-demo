import useStorefinder from 'modules/storefinder/hooks/useStorefinder'

module.exports = async ({grapql, props, store}) => {
  const partialStateUpdates = await useStorefinder.preload(store, props)

  const context = await new Promise(resolve => setTimeout(() => resolve({foo:'tar'}), 200))

  return { partialStateUpdates, context }
}

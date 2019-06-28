import useStorefinder from 'modules/storefinder/hooks/useStorefinder'

module.exports = async ({grapql, props, store}) => {
  const partialStateUpdates = await useStorefinder.preload(store, props)

  return { partialStateUpdates }
}

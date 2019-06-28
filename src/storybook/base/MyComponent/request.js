import useStorefinder from 'modules/storefinder/hooks/useStorefinder'

module.exports = async ({grapql, props, store}) => {
  const partialStateUpdates = await useStorefinder.preload(store, props)

  const initialProps = await new Promise(resolve => setTimeout(() => resolve({foo:'bar'}), 200))

  return { partialStateUpdates, initialProps }
}

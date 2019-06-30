import useStorefinder from 'modules/storefinder/hooks/useStorefinder'
import {makeHtml} from 'utils/transformMarkdown'

module.exports = async ({grapql, props, store}) => {
  const partialStateUpdates = await useStorefinder.preload(store, props)

  const context = await new Promise(resolve => setTimeout(() => resolve({foo:'tar'}), 200))

  return { partialStateUpdates, context }
}

// module.createPartialStateUpdates = async (store, props) => useStorefinder.preload(store, props)

// module.createContext = async props => ({tar: 'zar'})

// module.preprocessProps = props => Object.assign({},props, {
//   children: makeHtml(props.children)
// })
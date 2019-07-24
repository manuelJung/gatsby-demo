import toBase64 from 'utils/toBase64'
import useStorefinder from 'modules/storefinder/hooks/useStorefinder'


export async function createContext (props) {
  const base64Images = await Promise.all(props.images.map(img => toBase64(img.src)))

  return {base64Images}
}


export function preprocessProps (props) {
  let n = [1,2,3,4,5,6,7,8,9,10,11,12]
  let newProps = {title: props.title, images: [], gridArea: props.gridArea}
  n.forEach(n => newProps.images.push({
    src: props['image'+n],
    alt: props['alt'+n],
    link: props['link'+n],
  }))

  return newProps
}

export const createPartialStateUpdates = async (store, props) => useStorefinder.preload(store, props)
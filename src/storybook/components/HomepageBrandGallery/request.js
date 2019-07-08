

export function preprocessProps ({props}) {
  let n = [1,2,3,4,5,6,7,8,9,10,11,12]
  let newProps = {title: props.title, images: [], gridArea: props.gridArea}
  n.forEach(n => newProps.images.push({
    src: props['image'+n],
    alt: props['alt'+n],
    link: props['link'+n]
  }))
  return newProps
}
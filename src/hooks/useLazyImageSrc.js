import * as React from 'react'
import { useInView } from 'react-intersection-observer'

let run = () => null
try {
  run = window.requestIdleCallback || window.requestAnimationFrame
}
catch(e){}

export default function useLazyImageSrc (src, base64='') {
  const [ref, inView] = useInView()
  const [image, setImage] = React.useState(base64)

  React.useEffect(() => {
    if(!inView) return

    run(() => {
      var img = new Image()
      img.onload = () => setImage(src)
      img.src = src
    })
  }, [inView, src])

  return [ref, image]

  // return [undefined, base64]
}
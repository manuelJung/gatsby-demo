import * as React from 'react'
import { useInView } from 'react-intersection-observer'

let loaded = {}

let run = () => null
try {
  run = window.requestIdleCallback || window.requestAnimationFrame
}
catch(e){}

export default function useLazyImageSrc (src, base64='') {
  const [ref, inView] = useInView({triggerOnce:true})
  const [image, setImage] = React.useState(loaded[src] || base64)

  React.useEffect(() => {
    if(!inView) return
    if(loaded[src]) return

    run(() => {
      var img = new Image()
      img.onload = () => {
        loaded[src] = src
        setImage(src)
      }
      img.src = src
    })
  }, [inView, src])

  return [ref, image]

  // return [undefined, base64]
}
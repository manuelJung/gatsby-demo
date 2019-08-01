// @flow
import * as React from 'react'
import debounce from 'utils/debounce'

let requested = false
let list:[HTMLElement,Function][] = []

let run = (arg:*) => null
try {
  run = window.requestIdleCallback || window.requestAnimationFrame
}
catch(e){}

function calcWidth(el:HTMLElement|null, cb:(size:number)=>void){
  if(!el) return
  list.push([el, cb])
  if(!requested) run(calculate)
}

function calculate() {
  let widths = {}
  let i
  for(i=0;i<list.length;i++){
    widths[i] = list[i][0].offsetWidth
  }
  for(i=0;i<list.length;i++){
    const cb = list[i][1]
    cb(widths[i])
  }
  list = []
  requested = false
}


export default function useWidth (initialWidth:number=0) {
  const ref = React.useRef<HTMLElement>()
  const [width, setWidth] = React.useState(initialWidth)

  React.useEffect(() => {
    if(!ref.current) return
    calcWidth(ref.current, setWidth)

    const listener = debounce(() => calcWidth(ref.current, setWidth))
    window.addEventListener('resize', listener)
    return () => window.removeEventListener('resize', listener)
  }, [ref.current])

  return [ref, width]
}
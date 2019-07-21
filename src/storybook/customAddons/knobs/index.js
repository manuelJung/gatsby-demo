import React from 'react'
import * as manager from './KnobManager'
import {types} from './components'
import objPath from 'object-path'


export const text = (prop, label, value, options={}) => ({prop, label, value, options, type: types.TEXT})
export const select = (prop, label, value, options={}) => ({prop, label, value, options, type: types.SELECT})
export const boolean = (prop, label, value, options={}) => ({prop, label, value, options, type: types.BOOLEAN})
export const number = (prop, label, value, options={}) => ({prop, label, value, options, type: types.NUMBER})
export const array = (prop, label, value, options={}) => ({prop, label, value, options, type: types.ARRAY})
export const constant = (prop, label, value, options={}) => ({prop, label, value, options, type: types.CONSTANT})
export const drafttext = (prop, label, value, options={}) => ({prop, label, value, options, type: types.DRAFTTEXT})
export const imagesrc = (prop, label, value, options={}) => ({prop, label, value, options, type: types.IMAGE_SRC})


export const create = (Component, knobs, request) => context => {
  const userConfig = knobs.reduce((p,n) => {
    // TODO: error when reserved key is used as prop
    const knob = {
      ...n, 
      kind: context.kind, 
      story: context.story,
      storyId: context.id,
      componentName: Component.name,
      knobId: `${context.id}--${n.prop}`
    }
    objPath.set(p, n.prop, manager.getKnobValue(knob))
    return p
  }, {})
  return <Wrapper {...{userConfig, request, Component}}/>
}

function Wrapper ({userConfig, Component, request}) {
  const [shouldDisplay, props] = usePreprocession(userConfig, request)

  if(!shouldDisplay) return null

  return <Component {...props}/>
}



function usePreprocession (userConfig, request={}) {
  if(!request) return [true, userConfig]

  const [shouldDisplay, setShouldDisplay] = React.useState(false)
  const [props, setProps] = React.useState(userConfig)
  const currentUserConfig = React.useRef(userConfig)
  currentUserConfig.current = userConfig

  React.useEffect(() => {
    // TODO: maybe add throttling
    const {createContext, preprocessProps} = request
    Promise.resolve(userConfig)
    .then(props => preprocessProps ? preprocessProps(props) : props)
    .then(props => createContext ? createContext(props) : props)
    .then(props => {
      if(userConfig !== currentUserConfig.current) return
      setShouldDisplay(true)
      setProps(props)
    })
  }, [request.preprocessProps, request.createContext, userConfig])
  

  return [shouldDisplay, props]
}
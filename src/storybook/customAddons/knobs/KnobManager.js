// @flow
import addons from '@storybook/addons'
import { forceReRender } from '@storybook/react'

type Knob = {
  value: mixed,
  knobId: string,
  storyId: string,
  prop: string, 
  label: string,
  type: string,
  kind: string,
  story: string,
  options: {
    globalId?: string,
    group?: string
  }
}

type Channel = {
  emit: (event:string, options?:mixed) => void,
  on: (event:string, (val:mixed)=>void) => void
}

type Context = {
  kind: string,
  story: string,
  storyId: string
}

let knobs:{[id:string]:Knob} = {}
let globalValues:{[gobalId:string]:mixed} = {}
let context = null
let updaters:{[ComponentName:string]:Function} = {}

const channel:Channel = addons.getChannel()

const getCurrentKnobs = () => Object.values(knobs).filter(knob => {
  if(!context) return true
  if(context.storyId !== knob.storyId) return false
  else return true
})

const updatePanel = () => {
  const knobs = getCurrentKnobs(context)
  channel.emit('addon:rlx-knobs:setKnobs', knobs)
  forceReRender()
}

export const setUpdater = (componentName:string, cb:Function) => {
  updaters[componentName] = cb
}

export const getKnobValue = (knob:Knob) => {
  // register knob
  if(!knobs[knob.knobId]) setKnob(knob)
  if(knob.options.global){
    return globalValues[knob.options.global] || knobs[knob.knobId].value
  }

  return knobs[knob.knobId].value
}

const setKnob = (knob:Knob) => {
  knobs[knob.knobId] = knob
  if(knob.options.global){
    globalValues[knob.options.global] = knob.value
  }
  updatePanel()
}




// updaters

channel.on('addon:rlx-knobs:updateKnob', setKnob)

channel.on('setCurrentStory', _context => {
  context = _context
  updatePanel()
})

channel.on('addon:rlx-contentful:set-component', component => {
  const knobs = getCurrentKnobs()
  
  if(updaters[component.name]){
    component.props = updaters[component.name](component.props)
  }

  knobs.forEach(knob => {
    let newKnob = {...knob}
    if(component.props[newKnob.prop] !== undefined){
      newKnob.value = component.props[newKnob.prop]
      setKnob(newKnob)
    }
  })

  updatePanel()
})
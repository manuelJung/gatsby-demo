// @flow
import addons from '@storybook/addons'
import { forceReRender } from '@storybook/react'

type Knob = {
  value: mixed,
  knobId: string,
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
  story: string
}

let knobs:{[id:string]:Knob} = {}
let globalValues:{[gobalId:string]:mixed} = {}
let wasHydrated = false
let wasUpdated = false

const channel:Channel = addons.getChannel()

const getCurrentKnobs = (context?:Context) => Object.values(knobs).filter(knob => {
  if(!context) return true
  if(context.kind !== knob.kind) return false
  if(context.story !== knob.story) return false
  else return true
})

const updatePanel = (context?:Context) => {
  const knobs = getCurrentKnobs(context)
  channel.emit('addon:rlx-knobs:setKnobs', knobs)
  forceReRender()
  if(!wasHydrated){
    wasHydrated = true
    hydrate(context)
  }
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
  if(!wasUpdated){
    wasUpdated = true
    updatePanel()
  }
}

const hydrate = (context?:Context) => {
  const knobs = getCurrentKnobs(context)
  // let listener = window.addEventListener('message', e => {
  //   window.removeEventListener('message', listener)
  //   const component = {id:'',name:'',props:{}}
  //   knobs.forEach(knob => {
  //     let newKnob = {...knob}
  //     if(component.props[newKnob.prop] !== undefined){
  //       newKnob.value = component.props[newKnob.prop]
  //       setKnob(newKnob)
  //     }
  //   })
  //   updatePanel(context)
  // })
  // window.postMessage('knob-manager:ready')

  setTimeout(() => {
    const component = {id:'',name:'',props:{gridArea:'NewButton'}}
    knobs.forEach(knob => {
      let newKnob = {...knob}
      if(component.props[newKnob.prop] !== undefined){
        newKnob.value = component.props[newKnob.prop]
        setKnob(newKnob)
      }
    })
    updatePanel(context)
  }, 500)
}




// updaters

channel.on('addon:rlx-knobs:setKnobValue', setKnob)
channel.on('setCurrentStory', updatePanel)
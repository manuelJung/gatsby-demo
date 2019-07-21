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

export const create = (Component, knobs) => context => (
  <Component {...knobs.reduce((p,n) => {
    // TODO: error when reserved key is used as prop
    const knob = {
      ...n, 
      kind: context.kind, 
      story: context.story,
      knobId: `${context.story}-${context.kind}-${n.prop}`
    }
    objPath.set(p, n.prop, manager.getKnobValue(knob))
    return p
  }, {})} />
)
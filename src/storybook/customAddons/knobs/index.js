import React from 'react'
import KnobManager from './KnobManager'
import {types} from './components'
import objPath from 'object-path'

const manager = new KnobManager()

export const text = (prop, label, value, opts) => ({prop, label, value, ...opts, type: types.TEXT})
export const select = (prop, label, value, opts) => ({prop, label, value, ...opts, type: types.SELECT})
export const boolean = (prop, label, value, opts) => ({prop, label, value, ...opts, type: types.BOOLEAN})
export const number = (prop, label, value, opts) => ({prop, label, value, ...opts, type: types.NUMBER})
export const array = (prop, label, value, opts) => ({prop, label, value, ...opts, type: types.ARRAY})
export const constant = (prop, label, value, opts) => ({prop, label, value, ...opts, type: types.CONSTANT})
export const drafttext = (prop, label, value, opts) => ({prop, label, value, ...opts, type: types.DRAFTTEXT})

export const create = (Component, knobs) => context => (
  <Component
    {...knobs.reduce((p,n) => {
      objPath.set(p, n.prop, manager.getKnob({...n, ...context}))
      return p
    }, {})}
  />
)
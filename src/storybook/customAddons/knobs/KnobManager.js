import addons from '@storybook/addons'
import { forceReRender } from '@storybook/react'
import debounce from 'utils/debounce'

const shape = {
  value: '',
  label: '',
  prop: '',
  group: '',
  global: ''
}

const debouncedReRender = debounce(forceReRender, 200)

const initProps = window.parent.location.search
.slice(1)
.split('&')
.filter(s => s.startsWith('prop-'))
.map(s => s.split('='))
.map(([key, val]) => [
  decodeURIComponent(key.replace('prop-', '')),
  JSON.parse(decodeURIComponent(val))
])
.reduce((p, [key, val]) => Object.assign(p, { [key]: val }), {})

export default class KnobManager {

  constructor(){
    this.channel = addons.getChannel()
    this.store = {}
    this.context = null
    this.hasRendered = false

    this.channel.on('setCurrentStory', (context) => {
      this.context = context
      this.notifyChannel()
    })
    this.channel.on('addon:rlx-knobs:setKnobValue', p => this.setKnobValue(p.id, p.value))
    this.channel.on('addon:rlx-knobs:resetToDefault', () => this.resetToDefault())
    setTimeout(() => this.notifyChannel(), 500)
  }

  resetToDefault = () => {
    this.getKnobs().forEach(knob => this.store[knob._id].value = knob._defaultValue)
    this.notifyChannel()
    debouncedReRender()
  }

  setKnobValue = (id, value) => {
    this.store[id].value = value
    debouncedReRender()
  }

  getKnob = (knob) => {
    this.registerKnob(knob)
    return this.getKnobValue(knob)
  }

  getKnobValue = knob => {
    const id = knob.global ? knob.global : `${knob.kind}-${knob.story}-${knob.prop}`
    return this.store[id].value
  }

  registerKnob = (knob) => {
    const _id = knob.global ? knob.global : `${knob.kind}-${knob.story}-${knob.prop}`
    if(this.store[_id]){
      Object.assign(this.store[_id], {
        _defaultValue: knob.value,
        kind: knob.kind,
        story: knob.story,
        prop: knob.prop,
        group: knob.group || 'no group'
      })
      return
    }
    
    this.store[_id] = {
      ...knob, 
      _id, 
      _defaultValue: knob.value, 
      value: this.hasRendered ? knob.value : initProps[knob.prop],
      group: knob.group || 'no group'
    }
    if(this.store[_id].value === undefined){
      this.store[_id].value = knob.value
    }
  }

  getKnobs = () => this.context
    ? Object.values(this.store).filter(knob => this.context.kind === knob.kind && this.context.story == knob.story)
    : Object.values(this.store)

  notifyChannel = () => {
    this.hasRendered = true
    this.channel.emit('addon:rlx-knobs:setKnobs', this.getKnobs())
  }

}
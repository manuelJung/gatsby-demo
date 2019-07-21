// @flow
import * as React from 'react'
import styled from 'styled-components'
import {getComponent} from './components'

type Props = {
  channel: mixed,
  api: mixed
}

export default function Panel ({channel, api}) {
  const [knobs, tabs, activeTab, setActiveTab] = useKnobs(channel, api)

  const updateKnob = (knob, value) => {
    channel.emit('addon:rlx-knobs:updateKnob', {...knob, value})
  }

  return (
    <Wrapper>
      <div className='knob-list'>
        {knobs.map(knob => <ComponentFactory key={knob.storyId} knob={knob} onChange={val => updateKnob(knob, val)}/>)}
      </div>
    </Wrapper>
  )
}

function ComponentFactory ({knob, onChange}) {
  const [value, setValue] = React.useState(knob.value)
  const handleChange = value => {
    setValue(value)
    onChange(value)
  }
  const Component = getComponent(knob.type)
  return (
    <div className='knob-row'>
      <div className='label'>{knob.label}</div>
      <div className='value'>
        <Component value={value} onChange={handleChange} {...knob.options} />
      </div>
    </div>
  )
}

function useKnobs (channel, api) {
  const [knobs, setKnobs] = React.useState([])
  const [tabs, setTabs] = React.useState([])
  const [activeTab, setActiveTab] = React.useState('')

  React.useEffect(() => {
    channel.on('addon:rlx-knobs:setKnobs', knobs => {
      if(!knobs.length) return
      let tabs = {}
      knobs.forEach(knob => tabs[knob.options.group || 'GLOBAL'] = '')
      tabs = Object.keys(tabs)
      setKnobs(knobs)
      setTabs(tabs)
      setActiveTab(tabs[0])
    })
  }, [])

  return [knobs, tabs, activeTab, setActiveTab]
}

const Wrapper = styled.div`
  .knob-row {
    padding: 5px;
    > .label {
      width: 130px;
      padding: 3px;
      font-weight: bold;
    }
    > .value {
      width: 100%;
    }
  }
`
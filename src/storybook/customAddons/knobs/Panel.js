// @flow
import * as React from 'react'
import styled from 'styled-components'

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
        {knobs.map(knob => (
          <span onClick={() => updateKnob(knob, 'Hello World')}>
            {knob.type} - {knob.label} - {knob.value}
          </span>
        ))}
      </div>
    </Wrapper>
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

const Wrapper = styled.div``
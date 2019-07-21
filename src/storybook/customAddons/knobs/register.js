import React from 'react'
import addons from '@storybook/addons'
import Panel from './Panel'

addons.register('addons:rlx-knobs', api => {
  const channel = addons.getChannel()
  addons.addPanel('addons:rlx-knobs', {
    title: 'Eigenschaften',
    render: () => <Panel channel={channel} api={api} key="rlx-knobs-panel" />,
  })
})

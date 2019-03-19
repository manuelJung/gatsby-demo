import React from 'react'
import addons, { types } from '@storybook/addons'
import Panel from './Panel'

addons.register('addons:rlx-knobs', api => {
  const channel = addons.getChannel()
  addons.add('addons:rlx-knobs', {
    title: 'Eigenschaften',
    type: types.PANEL,
    render: () => <Panel channel={channel} api={api} key="rlx-knobs-panel" />,
  })
})

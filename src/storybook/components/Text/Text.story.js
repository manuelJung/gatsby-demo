import React from 'react'
import { storiesOf } from '@storybook/react'
import {create, string, markdown} from 'storybook/customAddons/knobs'
import Component from './Text'
import * as request from './request'

storiesOf('cms/base/Text', module)
  .add('Builder', create(Component, [
    string('gridArea', 'Grid-Area', 'Text'),
    markdown('children', 'Content', '', {
      hint: 'Hier ist der inhalt'
    })
  ], request))
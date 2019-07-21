import React from 'react'
import { storiesOf } from '@storybook/react'
import {create, text} from 'storybook/customAddons/knobs'
import Component from './Text'
import * as request from './request'

storiesOf('cms/base/Text', module)
  .add('Builder', create(Component, [
    text('gridArea', 'Grid-Area', 'Text'),
    text('children', 'Content', '')
  ], request))
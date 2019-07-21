import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import config from 'config'
import {create, text} from 'storybook/customAddons/knobs'

const Button = ({gridArea}) => <button>hello {gridArea}</button>


storiesOf('cms/base/Button', module)
  .add('with text', create(Button, [
    text('gridArea', 'Grid-Area', 'Button')
  ]))
  .add('with some emoji', create(Button, [
    text('gridArea', 'Grid-Area', 'Button')
  ]));
import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import config from 'config'

storiesOf('Button', module)
  .add('with text', () => <button onClick={action('clicked')}>Hello Button {config.app_name}</button>)
  .add('with some emoji', () => (
    <button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </button>
  ));
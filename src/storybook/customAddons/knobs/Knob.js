import React from 'react'
import pt from 'prop-types'
import { types } from './components'
import {Wrapper} from './style'
export default class Knob extends React.Component {
  static propTypes = {
    label: pt.string,
    prop: pt.string.isRequired,
    type: pt.string.isRequired,
    children: pt.node.isRequired
  }

  render() {
    let { label, prop, children } = this.props
    if (this.props.type === types.CONSTANT) return null
    return (
      <Wrapper className='knob-wrapper'>
        <div className='label'>{label || prop}</div>
        <div className='content'>{children}</div>
      </Wrapper>
    )
  }
}

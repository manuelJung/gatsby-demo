import React from 'react'
import pt from 'prop-types'

export default class ArrayComponent extends React.Component {
  static propTypes = {
    value: pt.arrayOf(pt.string).isRequired,
    onChange: pt.func.isRequired
  }

  state = { value: this.props.value }

  update = e => {
    const value = e.target.value.split('\n')
    this.setState({value}, () => this.props.onChange(value))
  }

  render(){
    return (
      <textarea 
        className='text-field'
        rows={this.state.value.length+2}
        value={this.state.value.join('\n')}
        onChange={this.update}
      />
    )
  }
}
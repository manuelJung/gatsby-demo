import React from 'react'
import pt from 'prop-types'

export default class Number extends React.Component {
  static propTypes = {
    value: pt.number.isRequired,
    onChange: pt.func.isRequired
  }

  state = {value: this.props.value}

  handleChange = e => {
    const value = parseInt(e.target.value)
    this.setState({value}, () => this.props.onChange(value))
  }

  render(){
    return (
      <input type='number' value={this.state.value} onChange={this.handleChange}/>
    )
  }
}
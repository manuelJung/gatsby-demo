import React from 'react'
import pt from 'prop-types'

export default class Boolean extends React.Component {
  static propTypes = {
    value: pt.bool.isRequired,
    onChange: pt.func.isRequired
  }

  state = {active: this.props.value}

  handleChange = () => {
    const active = !this.state.active
    this.setState({active}, () => this.props.onChange(active))
  }

  render(){
    return (
      <input type='checkbox' checked={this.state.active} onChange={this.handleChange}/>
    )
  }
}
import React from 'react'
import pt from 'prop-types'

export default class Select extends React.Component {
  static propTypes = {
    value: pt.string.isRequired,
    onChange: pt.func.isRequired,
    options: pt.arrayOf(pt.string).isRequired
  }

  state = { value: this.props.value }

  handleChange = e => {
    const value = e.target.value
    this.setState({value}, () => this.props.onChange(value))
  }

  render(){
    return (
      <select className='select-input' value={this.state.value} onChange={this.handleChange}>
        {this.props.options.map(opt => (
          <option className='select-option' key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    )
  }
}
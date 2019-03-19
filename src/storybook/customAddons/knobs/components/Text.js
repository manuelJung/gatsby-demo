import React from 'react'
import pt from 'prop-types'

export default class Text extends React.Component {
 static propTypes = {
   value: pt.string.isRequired,
   onChange: pt.func.isRequired
 }

 state = {
   value: this.props.value,
 }

 changeHeight = e => {
   e.target.style.height = "";
   e.target.style.height = `${e.target.scrollHeight+20}px`
 }

 handleChange = e => {
   const value = e.target.value
   this.setState({value}, () => this.props.onChange(value))
 }

 render(){
   return (
     <textarea id='myInput' className='text-field' value={this.state.value}
     onChange={this.handleChange} onFocus={this.changeHeight}
     />
   )
 }
}
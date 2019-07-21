// @flow
import React from 'react'
import styled from 'styled-components'

type Props = {
  value: String,
  onChange: (value:String) => mixed
}

type State = {
  value: String,
  isValid: boolean,
  isFocused: boolean
}

export default class Text extends React.Component<Props, State> {

 state = {
   value: this.props.value,
   isFocused: false,
   isValid: this.props.value.includes('https') && this.props.value.includes('f_auto')
 }

 handleChange = e => {
   const value = e.target.value
   const isValid = value.includes('https') && value.includes('f_auto')
   this.setState({value, isValid}, () => this.props.onChange(value))
 }

 render(){
   return (
     <Wrapper isValid={this.state.isValid} isFocused={this.state.isFocused}>
      <input 
        className='text-field'
        value={this.state.value}
        onChange={this.handleChange}
        onFocus={() => this.setState({isFocused: true})}
        onBlur={() => this.setState({isFocused: false})}
      />
      <div className='popover'>
        Eine Url muss mit "https" beginnen und benötigt einen "f_auto" parameter
      </div>
     </Wrapper>
   )
 }
}

const Wrapper = styled.div`
  position: relative;

  > input {
    background: ${props => props.isValid ? 'node' : '#ffeb3b'};
    padding: 5px;
    font-size: 16px;
  }

  > .popover {
    position: absolute;
    background: white;
    border: 1px solid black;
    padding: 10px;
    width: 100%;
    z-index: 100;
    display: ${props => !props.isValid && props.isFocused ? 'block' : 'none'};
  }
`
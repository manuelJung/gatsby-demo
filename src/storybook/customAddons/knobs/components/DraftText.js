import React from 'react'
import pt from 'prop-types'
import SimpleMDE from 'react-simplemde-editor'
import styled from 'styled-components'

const MAX_LENGTH = 46000

export default class DraftText extends React.Component {
  static propTypes = {
    onChange: pt.func.isRequired,
  }

  state = { value: this.props.value, length: this.props.value.length }


  handleChange = value => {
    this.setState({ value, length: value.length }, () => this.props.onChange(value))
  };

  render(){
    return (
      <Wrapper warn={this.state.length > MAX_LENGTH}>
        <SimpleMDE 
          onChange={this.handleChange}
          value={this.state.value}
          options={{
            autofocus: true,
            spellChecker: false,
            toolbar: false
          }}
        />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  .CodeMirror {
    background: ${props => props.warn ? '#ffeb3b !important' : ''};
  }
`
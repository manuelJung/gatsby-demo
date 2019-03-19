import React from 'react'
import pt from 'prop-types'
import {getComponent} from './components'
import Knob from './Knob'
import styled from 'styled-components'

export default class Panel extends React.Component {
  static propTypes = {
    channel: pt.shape({
      on: pt.func.isRequired,
      removeListener: pt.func.isRequired,
      emit: pt.func.isRequired
    }).isRequired,
    api: pt.object.isRequired,
  }

  state = {
    knobs: [],
    activeGroup: null,
    allGroups: []
  }

  componentDidMount(){
    this.props.channel.on('addon:rlx-knobs:setKnobs', this.updateKnobs)
  }

  componentWillUnmount(){
    this.props.channel.removeListener('addon:rlx-knobs:setKnobs', this.updateKnobs)
  }

  updateKnobs = knobs => {
    let activeGroup = null
    let allGroups = []

    // extract groups
    knobs.forEach(knob => !allGroups.find(group => group === knob.group) && (
      allGroups.push(knob.group)
    ))
    activeGroup = allGroups[0]

    // remove old params
    this.props.api.setQueryParams(this.state.knobs.reduce((p,n) => {
      p['prop-'+n.prop] = null
      return p
    }, {}))

    // set new params
    this.props.api.setQueryParams(knobs.reduce((p,n) => {
      p['prop-'+n.prop] = JSON.stringify(n.value)
      return p
    }, {}))

    this.setState({knobs, activeGroup, allGroups})
  }

  handleKnobChange = knob => value => {
    this.props.channel.emit('addon:rlx-knobs:setKnobValue', {
      id: knob._id, 
      value
    })
    knob.value = value
    this.props.api.setQueryParams({
      ['prop-'+knob.prop]: JSON.stringify(value)
    })
  }

  setActiveGroup = group => () => this.setState({activeGroup: group})

  getVisibleKnobs = () => this.state.activeGroup
    ? this.state.knobs.filter(knob => knob.group === this.state.activeGroup)
    : this.state.knobs

  renderKnob = knob => {
    const Component = getComponent(knob.type)
    if(!Component) return <h1>no component for type {knob.type}</h1>
    return (
      <Knob key={knob._id} {...knob}>
        <Component {...knob} onChange={this.handleKnobChange(knob)} />
      </Knob>
    )
  }

  handleReset = () => {
    this.props.channel.emit('addon:rlx-knobs:resetToDefault', {})
  }

  renderSubPanels = () => {
    let {activeGroup, allGroups} = this.state
    if(allGroups.length === 1) return null

    return (
      <SubPanelList>
        {allGroups.map(group => (
          <SubPanel 
            className='panel' 
            key={group} 
            active={group === activeGroup}
            children={group}
            onClick={this.setActiveGroup(group)}
          />
        ))}
      </SubPanelList>
    )
  }

  render(){
    return (
      <Wrapper>
        {this.renderSubPanels()}
        <div>
          {this.getVisibleKnobs().map(this.renderKnob)}
        </div>
        <ResetButton onClick={this.handleReset}>Zurücksetzen</ResetButton>
      </Wrapper>
    )
  }
}

const Wrapper = styled.section`
  position: relative;
  width: 100%;
`

const SubPanelList = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid rgb(234, 234, 234);
`

const SubPanel = styled.div`
  color: rgb(68, 68, 68);
  -webkit-font-smoothing: antialiased;
  font-size: 11px;
  letter-spacing: 1px;
  padding: 10px 15px;
  text-transform: uppercase;
  transition: opacity 0.3s ease 0s;
  opacity: ${props => props.active ? 1 : 0.5};
  max-height: 60px;
  overflow: hidden;
  cursor: pointer;
  background: transparent;
  border: none;
  text-transform: uppercase;
  text-align: center;
  font-family: -apple-system, ".SFNSText-Regular", "San Francisco", BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", "Lucida Grande", Arial, sans-serif;
`

const ResetButton = styled.button`
  position: fixed;
  right: 25px;
  bottom: 10px;
  color: #444444;
  background: #efefef;
  border-radius: 2px;
  height: 30px;
  cursor: pointer;
  padding: 5px;
  font-weight: bold;
`
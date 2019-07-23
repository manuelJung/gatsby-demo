import React from 'react'
import { storiesOf } from '@storybook/react'
import  {registerComponentSelector} from 'storybook/customAddons/contentful'
import {create, string, constant} from 'storybook/customAddons/knobs'
import Component from './MagazineArticleTeaserByIdWidget'
import * as request from './request'

registerComponentSelector(Component.name, props => {
  return {kind:'cms/base/MagazineArticleTeaserByIdWidget',story:'Builder'}
})

storiesOf('cms/base/MagazineArticleTeaserByIdWidget', module)
  .add('Builder', create(Component, [
    constant('_updateId', 'a', 2),
    string('gridArea', 'Grid-Area', 'MagazineArticleTeaserByIdWidget'),
    string('magazineArticleId', 'Object ID', '')
  ], request, updater))


function updater(props){
  if(!props._updateId){
    props = {...props, _updateId: 1}
  }
  if(props._updateId === 1){
    props = {
      _updateId: 2,
      gridArea: props.gridArea,
      magazineArticleId: props.id
    }
  }
  return props
}
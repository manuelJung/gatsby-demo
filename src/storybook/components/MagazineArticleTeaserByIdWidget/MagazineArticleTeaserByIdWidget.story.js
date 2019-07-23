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
    constant('__version', 'a', 2),
    string('gridArea', 'Grid-Area', 'MagazineArticleTeaserByIdWidget'),
    string('magazineArticleId', 'Object ID', '')
  ], request))


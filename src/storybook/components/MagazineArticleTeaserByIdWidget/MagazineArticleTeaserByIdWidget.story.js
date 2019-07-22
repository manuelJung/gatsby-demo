import React from 'react'
import { storiesOf } from '@storybook/react'
import {create, string} from 'storybook/customAddons/knobs'
import Component from './MagazineArticleTeaserByIdWidget'
import * as request from './request'

storiesOf('cms/base/MagazineArticleTeaserByIdWidget', module)
  .add('Builder', create(Component, [
    string('gridArea', 'Grid-Area', 'MagazineArticleTeaserByIdWidget'),
    string('magazineArticleId', 'Object ID', '4qswg0V6O6wEfp0EoKN1UH')
  ], request))
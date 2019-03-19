import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

import {create, text, boolean, constant} from '../storybook/customAddons/knobs'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Test', module)

.add('Builder', create(Button, [
    text('gridArea', 'Grid-Area', 'Button'),
    text('link', 'Link', '/home'),
    text('label', 'Label', 'Zur Homepage'),
    boolean('stretch', 'Stretch', false),
    constant('isCPC', 'Ist CPC Button', false),
    constant('manualcpc', 'manualcpc', ''),
    constant('e1', 'e1', ''),
    constant('e2', 'e2', ''),
    constant('e3', 'e3', ''),
    text('children', 'Content', 'Text')
]))


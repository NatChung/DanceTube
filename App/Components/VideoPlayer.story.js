import React from 'react'
import { storiesOf } from '@storybook/react-native'

import VideoPlayer from './VideoPlayer'

storiesOf('VideoPlayer')
  .add('Default', () => (
    <VideoPlayer />
  ))

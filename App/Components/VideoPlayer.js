import React from 'react'
import {StyleSheet} from 'react-native'
import Video from 'react-native-video'

const styles = StyleSheet.create({
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
})

class VideoPlayer extends React.Component {

  constructor (props) {
    super(props)
    this.player = null
  }

  // Callback when video starts to load
  loadStart () {}

  // Callback when video loads
  setDuration () {}

  // Callback every ~250ms with currentTime
  setTime () {}

  // Callback when playback finishes
  onEnd () {}

  // Callback when video cannot be loaded
  videoError () {}

  // Callback when remote video is buffering
  onBuffer () {}

  // Callback when the stream receive some metadata
  onTimedMetadata () {}

  render () {
    return (
      <Video
        source={{uri: 'test2.mp4'}}
        ref={(ref) => {this.player = ref}}
        rate={0.5}
        volume={1}
        muted={false}
        paused={false}
        resizeMode="none"
        repeat={true}
        playInBackground={false}
        playWhenInactive={false}
        progressUpdateInterval={250.0}
        onLoadStart={this.loadStart}
        onLoad={this.setDuration}
        onProgress={this.setTime}
        onEnd={this.onEnd}
        onError={this.videoError}
        onBuffer={this.onBuffer}
        onTimedMetadata={this.onTimedMetadata}
        style={styles.video}
      />
    )
  }
}

export default VideoPlayer


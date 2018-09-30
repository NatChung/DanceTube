import React from 'react'
import {StyleSheet, View} from 'react-native'
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
    this.duration = 0
    this.currentTime = 0

    this._onProgress = this.onProgress.bind(this)
    this._onLoad = this.onLoad.bind(this)
  }

  // Callback when video loads
  onLoad (data) {
    this.duration = data.duration
    this.props.onLoad(this.duration)
  }

  // Callback every ~250ms with currentTime
  onProgress (data) {
    this.currentTime = data.currentTime
    this.props.onProgress(this.currentTime)
  }

  // Callback when video cannot be loaded
  videoError (err) {console.log('video player error: ', err)}

  render () {
    return (
      
      <Video
        source={{uri: '/data/user/0/com.dancetube/files/RNFetchBlobTmp_f31254jpnpcyd8bo8off3'}}
        ref={(ref) => {this.player = ref}}
        rate={this.props.rate}
        volume={1}
        muted={false}
        paused={this.props.paused}
        resizeMode="none"
        repeat={false}
        playInBackground={false}
        playWhenInactive={false}
        progressUpdateInterval={250.0}
        onLoad={this._onLoad}
        onProgress={this._onProgress}
        onError={this.videoError}
        style={this.props.style}
      />
    )
  }
}

export default VideoPlayer


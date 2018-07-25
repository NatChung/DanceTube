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
        source={{uri: 'https://r3---sn-p5qs7nee.googlevideo.com/videoplayback?expire=1532559690&mn=sn-p5qs7nee%2Csn-vgqsener&ipbits=0&key=yt6&ei=6qxYW-18jZGHBpiHjuAB&c=WEB&lmt=1507169390801963&ms=au%2Conr&mime=video%2Fmp4&mv=u&mt=1532537928&source=youtube&pl=21&id=o-AJQUIQLKcpwb3aQEXJfEENRPW_vXJd7Cs38ngZuf43_Z&ratebypass=yes&fvip=4&dur=85.077&itag=22&sparams=dur%2Cei%2Cid%2Cip%2Cipbits%2Citag%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cpl%2Cratebypass%2Crequiressl%2Csource%2Cexpire&requiressl=yes&ip=107.20.60.76&mm=31%2C26&signature=E2CFBA04620DC554CE06BE4E3FD50F37265014FF.3878631946BF1D70677CC4DF2987140CB0F83DE4'}}
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


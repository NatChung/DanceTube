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
        source={{uri: 'https://r4---sn-p5qlsnsr.googlevideo.com/videoplayback?itag=22&ip=54.211.155.161&fvip=4&ms=au%2Conr&mv=m&mt=1532586280&ratebypass=yes&requiressl=yes&id=o-ABYSr4wsndRDqOWxoUbjYeUBpevkGnHo0o9RvVzVyRxH&mn=sn-p5qlsnsr%2Csn-vgqsener&mm=31%2C26&c=WEB&key=yt6&sparams=dur%2Cei%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cpl%2Cratebypass%2Crequiressl%2Csource%2Cexpire&initcwndbps=4820000&source=youtube&mime=video%2Fmp4&expire=1532607919&ipbits=0&dur=85.077&pl=16&lmt=1507169390801963&ei=T2lZW__lJsSMhwasjbfICA&signature=7BEAEDBE322433811B0A7DC06C3A112D74BF0945.7E81C17DCB4B327212EC388C5AB09619FEDE059B'}}
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


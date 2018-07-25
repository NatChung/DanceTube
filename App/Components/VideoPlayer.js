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
        source={{uri: 'https://r3---sn-p5qs7nee.googlevideo.com/videoplayback?ms=au%2Conr&mv=m&mt=1532509825&requiressl=yes&dur=85.077&pl=17&expire=1532531541&c=WEB&ratebypass=yes&fvip=4&mn=sn-p5qs7nee%2Csn-vgqsener&source=youtube&mm=31%2C26&initcwndbps=4138750&sparams=dur%2Cei%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cpl%2Cratebypass%2Crequiressl%2Csource%2Cexpire&id=o-ACGPXrM4Xo_D9_-OAPFDBK6VhNK1yLuaoC7Rzlv3glwx&lmt=1507169390801963&ei=9T5YW6OCF4668gTG7ZiwCQ&ipbits=0&itag=22&key=yt6&ip=54.167.216.139&mime=video%2Fmp4&signature=5D58DD617B84E485589C7009DA304A50DF2FAB91.68C37A5F1D17B8718BA60278DDE0776E5817BB29'}}
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


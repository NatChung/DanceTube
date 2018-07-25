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
        source={{uri: 'https://r4---sn-p5qlsnsr.googlevideo.com/videoplayback?mt=1532485129&key=yt6&ip=54.211.26.227&lmt=1507169390801963&ms=au%2Conr&fvip=4&source=youtube&mv=u&dur=85.077&id=o-AJf1epUM1sPGqA86KQBrJmHZc_-U4wpb50ooGvvhIVue&expire=1532507261&mm=31%2C26&mn=sn-p5qlsnsr%2Csn-vgqsener&c=WEB&mime=video%2Fmp4&itag=22&requiressl=yes&ratebypass=yes&pl=20&ei=HeBXW8X_K8Gz8wTfmb3YCQ&ipbits=0&sparams=dur%2Cei%2Cid%2Cip%2Cipbits%2Citag%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cpl%2Cratebypass%2Crequiressl%2Csource%2Cexpire&signature=D28D3869EE4DB43A593DFC5A7EE43683AD98BF3D.6EE663F0100802BD74B8D1CB8300564E76FDC7D8'}}
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


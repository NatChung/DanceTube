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
        source={{uri: 'https://r5---sn-p5qs7ned.googlevideo.com/videoplayback?mime=video%2Fmp4&mn=sn-p5qs7ned%2Csn-vgqsknek&mm=31%2C26&ms=au%2Conr&ipbits=0&ratebypass=yes&key=yt6&pl=16&mt=1532599311&expire=1532620998&c=WEB&ip=54.87.47.43&requiressl=yes&sparams=dur%2Cei%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cpl%2Cratebypass%2Crequiressl%2Csource%2Cexpire&itag=22&lmt=1507179028731560&fvip=5&id=o-AO9CDlPcRKD8GC75H85RJ5Gi1VPQ3LtjBxtkr6cSE1He&ei=ZpxZW-T1HtKt8wS5mqugCA&mv=m&dur=260.226&source=youtube&initcwndbps=6032500&signature=08D306A8D725C9EC0D81DB4EFBF2999C1D930784.460EF02FE340B882C35F38D4038D1824D976A74F'}}
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


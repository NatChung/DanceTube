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
        source={{uri: 'https://r8---sn-ipoxu-un5z.googlevideo.com/videoplayback?ei=f6FVW6a8BISkqQGbh6r4Bg&itag=18&requiressl=yes&mm=31%2C29&expire=1532360159&initcwndbps=887500&source=youtube&dur=143.360&clen=13144404&c=WEB&ratebypass=yes&lmt=1422679947385394&ipbits=0&gir=yes&mn=sn-ipoxu-un5z%2Csn-un57sn7z&key=yt6&ip=61.216.78.73&ms=au%2Crdu&fvip=5&mv=m&sparams=clen%2Cdur%2Cei%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cpl%2Cratebypass%2Crequiressl%2Csource%2Cexpire&mt=1532338446&pl=24&mime=video%2Fmp4&id=o-AIXThFN7d3-neVy_dS7P4ENUDOnF7ZeiVE3eV-8NZVoA&signature=BE606EFE9D0E31F9D3C9BF756101A364E30D2254.51CFC20115406867F58880202557AEAA30ECF0E3'}}
        ref={(ref) => {this.player = ref}}
        rate={1}
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


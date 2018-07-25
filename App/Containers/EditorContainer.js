import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Slider } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import VideosActions from '../Redux/VideosRedux'

// Styles
import styles from './Styles/EditorContainerStyle'


// Component
import GridView from 'react-native-super-grid'
import ControlPannel from '../Components/EditorControlPannel'
import VideoPlayer from '../Components/VideoPlayer'

class EditorContainer extends Component {
  constructor(props) {
    super(props)

    this.player = null
    this.selectedItem = null

    this._onRecord = this.onRecord.bind(this)
    this._onBreak = this.onBreak.bind(this)
    this._onProgress = this.onProgress.bind(this)
    this._onLoad = this.onLoad.bind(this)
    this._onPlay = this.onPlay.bind(this)
    this._onValueChange = this.onValueChange.bind(this)

    this.state = {
      paused: true,
      rate: 1,
      items: [],
      isRecording: false,
      value: 0
    }
  }

  _startRecord(){
    
    this.setState({ 
      items: [this.state.items[0], {
        code: 0,
        start: this.player.currentTime,
        end: 0
      }] , 
      paused: false,
      isRecording: true
    })
  }

  _stopRecord(){

    this.setState({
      isRecording: false,
      paused: true
    })
    
  }

  onRecord() {

    this.selectedItem = null
    if(this.state.isRecording) this._stopRecord()
    else this._startRecord()
  }

  _updateItems(currentTime){
    let items = this.state.items.slice(0)
    let lastItem = items[items.length-1]
    lastItem.end = currentTime
    lastItem.code = lastItem.end - lastItem.start

    return items
  }

  onBreak() {

    let items = this._updateItems(this.player.currentTime)
    items.push({
      code: 0,
      start: this.player.currentTime,
      end: 0
    })
    this.setState({ items: [...items] })

    
  }

  onPlay(){
    this.setState({paused: !this.state.paused})
  }

  onProgress(currentTime) {
    if (this.state.paused) return

    this.setState({ value: currentTime / this.player.duration })
    if ( this.selectedItem && currentTime >= (this.selectedItem.end+0.5)) {
      this.player.player.seek(this.selectedItem.start)
    }

    if(this.state.isRecording){
      let items = this._updateItems(this.player.currentTime)
      this.setState({ items: [...items] })
    }
  }

  onLoad(duration) {
    this.setState({
      items: [{
        code: duration,
        start: 0,
        end: duration,
        original: true
      }]
    })
  }

  onItemClick(item) {
    this.setState({ paused: false })
    this.player.player.seek(item.start)
    this.selectedItem = (item.original) ? null : item
  }

  onValueChange(value){
    this.player.player.seek(value * this.player.duration)
  }

  render() {
    return (
      <View style={styles.container}>

        <VideoPlayer
          ref={ref => this.player = ref}
          rate={this.state.rate}
          paused={this.state.paused}
          style={styles.video}
          onLoad={this._onLoad}
          onProgress={this._onProgress}
        />

        <Slider value={this.state.value} onValueChange={this._onValueChange} />

        <ControlPannel
          paused = {this.state.paused}
          isRecording = {this.state.isRecording}
          onPlay={this._onPlay} 
          onRecord={this._onRecord}
          onBreak={this._onBreak} />
        
        <GridView
          itemDimension={70}
          items={this.state.items}
          style={styles.gridView}
          renderItem={item => (
            <TouchableOpacity onPress={() => this.onItemClick(item)} style={[styles.itemContainer, { backgroundColor: '#3498db' }]}>
              <Text style={styles.itemCode}>{Math.round(item.code)}</Text>
            </TouchableOpacity>
          )}
        />

        
        
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    videos: state.videos
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveVideo: video => dispatch(VideosActions.youtubeVideoSave(video))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer)

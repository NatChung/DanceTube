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
import EditController from '../Components/EditController'
import PlayController from '../Components/PlayController'
import VideoPlayer from '../Components/VideoPlayer'

const Controller = props => (props.isEditing) ?
  <EditController
    paused={props.paused}
    isRecording={props.isRecording}
    onPlay={props.onPlay}
    onRecord={props.onRecord}
    onBreak={props.onBreak} />
  : <PlayController
    paused={props.paused}
    isRecording={props.isRecording}
    onPlay={props.onPlay}
    onRecord={props.onRecord}
    onBreak={props.onBreak} />


class EditorContainer extends Component {
  constructor(props) {
    super(props)

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
      selectedItems: [],
      isRecording: false,
      isEditing: true,
      value: 0,
    }
  }

  _selectFirstItem() {
    this.setState({ selectedItems: [this.firstItem] })
    this.playableDuration = { start: 0, end: this.firstItem.end }
  }

  onLoad(duration) {
    this.firstItem = {
      code: duration,
      start: 0,
      end: duration,
      original: true
    }

    this.setState({ items: [this.firstItem] })
    this._selectFirstItem()
  }

  _startRecord() {
    const currentTime = this.player.currentTime //Must using const current to assign for check continue selection
    
    this.setState({
      items: [this.state.items[0], {
        code: 0,
        start: currentTime,
        end: 0
      }],
      selectedItems: [],
      paused: false,
      isRecording: true
    })
  }

  _stopRecord() {

    this._selectFirstItem()
    this.setState({
      isRecording: false,
      paused: true
    })

  }

  onRecord() {

    if (this.state.isRecording) this._stopRecord()
    else this._startRecord()
  }

  _updateItems(currentTime) {
    let items = this.state.items.slice(0)
    let lastItem = items[items.length - 1]

    lastItem.end = currentTime
    lastItem.code = lastItem.end - lastItem.start

    return items
  }

  onBreak() {

    const currentTime = this.player.currentTime //Must using const current to assign for check continue selection
    let items = this._updateItems(currentTime)
    items.push({
      code: 0,
      start: currentTime,
      end: 0
    })
    this.setState({ items: [...items] })
  }

  onPlay() {
    this.setState({ paused: !this.state.paused })
  }

  onProgress(currentTime) {
    if (this.state.paused) return

    this.setState({ value: currentTime / this.player.duration })

    if (this.state.isRecording) {
      this.setState({ items: [...this._updateItems(currentTime)] })
    } else if (currentTime >= (this.playableDuration.end + 0.5)) { //Not recording
      this.player.player.seek(this.playableDuration.start)// Do repeat play
    }
  }

  _cloneSelectedItemsWithoutFirstItem() {
    return (this.state.selectedItems.includes(this.firstItem)) ? this.state.selectedItems.slice(1) : this.state.selectedItems.slice(0)
  }

  _isContinueSelect(item) {
    return  (item.start === this.playableDuration.end || item.end === this.playableDuration.start)
  }

  _doInitialSelect(item) {
    this.setState({ selectedItems: [item] })
    this.playableDuration = {
      start: item.start,
      end: item.end
    }
  }

  _doContinueSelect(selectedItems, item) {
    this.setState({ selectedItems: [...selectedItems, item] })
    this.playableDuration = {
      start: (item.start < this.playableDuration.start) ? item.start : this.playableDuration.start,
      end: (item.end > this.playableDuration.end) ? item.end : this.playableDuration.end
    }
  }

  _isHeaderOfSelectedItem(item){
    return this.playableDuration.start === item.start
  }

  _isTailOfSelectedItem(item){
    return this.playableDuration.end === item.end
  }

  _isHeaderOrTailOfSelectItems(item){
    return (this._isHeaderOfSelectedItem(item) || this._isTailOfSelectedItem(item))
  }

  _isUnSelect(item){
    return (this.state.selectedItems.includes(item) && this._isHeaderOrTailOfSelectItems(item))
  }

  _doUnSelect(item) {
    var index = this.state.selectedItems.indexOf(item)
    this.state.selectedItems.splice(index, 1)

    if (this._isHeaderOfSelectedItem(item)) {
      this.playableDuration.start = item.end
    } else if (this._isTailOfSelectedItem(item)) {
      this.playableDuration.end = item.start
    } else {
      throw new Error('Not in playable duration start or end !!!')
    }

  }

  _selectNewItem(item) {

    let selectedItems = this._cloneSelectedItemsWithoutFirstItem()
    
    if (selectedItems.length === 0) {
      this._doInitialSelect(item)
    } else if (this._isContinueSelect(item) === true) {
      this._doContinueSelect(selectedItems, item)
    } else if (this._isUnSelect(item)) {
      this._doUnSelect(item)
    } else {
      console.log('Not continue select')
    }

  }

  onItemClick(item) {

    this.setState({isEditing: (item === this.firstItem)})

    if (item === this.firstItem) this._selectFirstItem()
    else this._selectNewItem(item)

    // this.setState({ paused: false })
    // this.player.player.seek(this.playableDuration.start)
  }

  onValueChange(value) {
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

        <Controller
          paused={this.state.paused}
          isRecording={this.state.isRecording}
          isEditing={this.state.isEditing}
          onPlay={this._onPlay}
          onRecord={this._onRecord}
          onBreak={this._onBreak} />

        <GridView
          itemDimension={70}
          items={this.state.items}
          style={styles.gridView}
          renderItem={item => (
            <TouchableOpacity
              disabled={this.state.isRecording}
              onPress={() => this.onItemClick(item)}
              style={[styles.itemContainer, { backgroundColor: (this.state.selectedItems.includes(item)) ? 'blue' : '#3498db' }]}>
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

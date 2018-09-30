import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Slider, 
  PermissionsAndroid 
} from 'react-native'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import VideosActions from '../Redux/VideosRedux'
import DownloaderActions from '../Redux/DownloaderRedux'

// Styles
import styles from './Styles/EditorContainerStyle'

// Component
import GridView from 'react-native-super-grid'
import EditController from '../Components/EditController'
import PlayController from '../Components/PlayController'
import VideoPlayer from '../Components/VideoPlayer'

const RATES = [1, 0.75, 0.25]

async function requestReadExternalStoragePermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        'title': 'DanceTube Read External storage Permission',
        'message': 'DanceTube needs access to your external storage ' +
          'so you can read local file of video.'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the external storage")
    } else {
      console.log("Read external storage permission denied")
    }
  } catch (err) {
    console.warn(err)
  }
}

async function requestWriteExternalStoragePermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        'title': 'DanceTube Write External Storage Permission',
        'message': 'DanceTube needs access to your external storage ' +
          'so you can save video.'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the write external storage")
    } else {
      console.log("Write external stoage permission denied")
    }
  } catch (err) {
    console.warn(err)
  }
}

class EditorContainer extends Component {
  constructor(props) {
    super(props)

    requestReadExternalStoragePermission()
    requestWriteExternalStoragePermission()

    this._onRecord = this.onRecord.bind(this)
    this._onProgress = this.onProgress.bind(this)
    this._onLoad = this.onLoad.bind(this)
    this._onPlay = this.onPlay.bind(this)
    this._onValueChange = this.onValueChange.bind(this)
    this._onChangePlayRate = this.onChangePlayRate.bind(this)
    this._onDownload = this.onDownload.bind(this)

    this.state = {
      paused: true,
      rate: 1,
      items: [],
      selectedItems: [],
      isRecording: false,
      isEditing: true,
      value: 0,
      rateIndex: 0
    }
  }

  _selectFirstItem() {
    this.setState({ selectedItems: [this.firstItem], rateIndex: 0 })
    this.rateIndex = 0
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

  _startRecord(currentTime) {
    
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
    else this._startRecord(this.player.currentTime)
  }

  _updateItems(currentTime) {
    let items = this.state.items.slice(0)
    let lastItem = items[items.length - 1]

    lastItem.end = currentTime
    lastItem.code = lastItem.end - lastItem.start

    return items
  }

  onBreak(currentTime) {
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

  onChangePlayRate(){
    this.setState({rateIndex: ++this.rateIndex})
  }

  onDownload(){
    console.log('onDownlaod')
    this.props.downloadVideo({vid: 'vid', url: 'https://r3---sn-ufohvc-u2xe.googlevideo.com/videoplayback?itag=18&id=o-AOo065BtDEesEfNbKPPZkkjouIFoIa5qJq_UHTmoZHq4&ip=101.8.200.237&key=yt6&lmt=1465344984226387&dur=85.101&pcm2cms=yes&mime=video%2Fmp4&sparams=clen%2Cdur%2Cei%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cpcm2cms%2Cpl%2Cratebypass%2Crequiressl%2Csource%2Cexpire&fvip=2&c=WEB&gir=yes&initcwndbps=875000&pl=21&source=youtube&ratebypass=yes&mv=m&mt=1538291110&ms=au%2Crdu&clen=7851848&ei=DXawW8HNJJfMgAORtqL4Aw&expire=1538312813&requiressl=yes&mn=sn-ufohvc-u2xe%2Csn-u4o-u2xk&mm=31%2C29&ipbits=0&signature=26A692C29D557361EABCFCB7A10B9F009D07DB27.78A9E8DCCA695CAF7DE0188656C5DC5934EC4DE2' })
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
  }

  onValueChange(value) {
    this.player.player.seek(value * this.player.duration)
  }

  render() {
    return (
      <View style={styles.container}>

        <VideoPlayer
          ref={ref => this.player = ref}
          rate={RATES[this.state.rateIndex%RATES.length]}
          paused={this.state.paused}
          style={styles.video}
          onLoad={this._onLoad}
          onProgress={this._onProgress}
        />

        <Slider value={this.state.value} onValueChange={this._onValueChange} />

        {(this.state.isEditing) ?
          <EditController
            paused={this.state.paused}
            rate={this.state.rate}
            isRecording={this.state.isRecording}
            onPlay={this._onPlay}
            onRecord={this._onRecord}
            onDownload={this._onDownload}
            onBreak={() => this.onBreak(this.player.currentTime)} /> :
          <PlayController
            paused={this.state.paused}
            isRecording={this.state.isRecording}
            onPlay={this._onPlay} 
            onChangePlayRate={this._onChangePlayRate}/>}

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
    videos: state.videos,
    videoPath: state.downloader.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveVideo: video => dispatch(VideosActions.youtubeVideoSave(video)),
    downloadVideo: (data) => dispatch(DownloaderActions.downloaderRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer)

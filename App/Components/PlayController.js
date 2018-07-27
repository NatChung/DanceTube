import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, TouchableOpacity,Text } from 'react-native'
import styles from './Styles/PlayControllerStyle'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class PlayController extends Component {
  // // Prop type warnings
  static propTypes = {
    isRecording: PropTypes.bool.isRequired,
    paused: PropTypes.bool.isRequired,
    onPlay: PropTypes.func,
    onChangePlayRate: PropTypes.func,
    onVideoRecord: PropTypes.func,
    onPlayback: PropTypes.func
  }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.pannelBackground} >
          <TouchableOpacity 
            disabled={this.props.isRecording}
            onPress={this.props.onPlay} 
            style={(this.props.isRecording) ? styles.disabledButton : styles.playButton} >
            <Icon name={(this.props.paused) ? "play" : "pause"} size={50}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.onChangePlayRate} style={styles.recordButton} >
            <Text> {'速度'} </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.onVideoRecord} style={styles.recordButton} >
            <Text> {'錄影'} </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.props.onPlayback}
            style={styles.breakButton } >
            <Text> {'回放'} </Text>
          </TouchableOpacity>
        </View>
        
      </View>
    )
  }
}

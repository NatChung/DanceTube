import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/EditControllerStyle'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class EditController extends Component {
  // Prop type warnings
  static propTypes = {
    isRecording: PropTypes.bool.isRequired,
    paused: PropTypes.bool.isRequired,
    onPlay: PropTypes.func,
    onRecord: PropTypes.func,
    onBreak: PropTypes.func,
    onDownload: PropTypes.func
  }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.pannelBackground} >
          <TouchableOpacity 
            disabled={this.props.isRecording}
            onPress={this.props.onPlay} 
            style={(this.props.isRecording) ? styles.disabledButton : styles.playButton} >
            <Icon name={(this.props.paused) ? "play" : "pause"} size={50}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.onRecord} style={styles.recordButton} >
            <Icon name={(this.props.isRecording) ? "square" : "circle"} size={50} color='red' />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={!this.props.isRecording}
            onPress={this.props.onBreak}
            style={(!this.props.isRecording) ? styles.disabledButton : styles.breakButton } >
            <Icon name="cut" size={50} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.props.onDownload}
            style={styles.downloadButton } >
            <Icon name="download" size={50} />
          </TouchableOpacity>
          
        </View>
      </View>
    )
  }
}

import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/EditorControlPannelStyle'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class EditorControlPannel extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
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
          
        </View>
      </View>
    )
  }
}

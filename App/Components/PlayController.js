import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, TouchableOpacity,Text } from 'react-native'
import styles from './Styles/PlayControllerStyle'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class PlayController extends Component {
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
          <TouchableOpacity onPress={this.props.onRecord} style={styles.recordButton} >
            <Text> {'速度'} </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={!this.props.isRecording}
            onPress={this.props.onBreak}
            style={(!this.props.isRecording) ? styles.disabledButton : styles.breakButton } >
            <Text> {'預備'} </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            disabled={this.props.isRecording}
            onPress={this.props.onPlay} 
            style={(this.props.isRecording) ? styles.disabledButton : styles.playButton} >
            <Text> {'休息'} </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.onRecord} style={styles.recordButton} >
            <Text> {'錄影'} </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={!this.props.isRecording}
            onPress={this.props.onBreak}
            style={(!this.props.isRecording) ? styles.disabledButton : styles.breakButton } >
            <Text> {'回放'} </Text>
          </TouchableOpacity>
        </View>
        
      </View>
    )
  }
}

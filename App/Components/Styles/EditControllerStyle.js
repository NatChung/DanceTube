import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    height: 100
  },
  playButton: {
    flex: 1,
    backgroundColor: 'lightgreen',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 5,
  },
  recordButton: {
    flex: 1,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  breakButton: {
    flex: 1,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 10,
  },
  disabledButton:{
    flex: 1,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 10,
  },
  pannelBackground:{
    flex:1,
    flexDirection: 'row'
  }
})

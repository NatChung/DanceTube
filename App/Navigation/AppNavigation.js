import { StackNavigator } from 'react-navigation'
import EditorContainer from '../Containers/EditorContainer'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  EditorContainer: { screen: EditorContainer },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'EditorContainer',
  navigationOptions: {
    headerStyle: styles.header,
    header:null
  }
})

export default PrimaryNav

import { Dimensions } from 'react-native'

export default function useScreenDimensions() {
  const screenHeight = Dimensions.get('screen').height
  const screenWidth = Dimensions.get('screen').width

  return { screenHeight, screenWidth }
}

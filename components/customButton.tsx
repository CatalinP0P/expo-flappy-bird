import React from 'react'
import { TouchableOpacity, Image } from 'react-native'

export default function CustomButton({
  type,
  onPress,
}: {
  type: 'share' | 'ok' | 'menu' | 'start' | 'score'
  onPress?: () => unknown
}) {
  const getPhoto = () => {
    switch (type) {
      case 'share':
        return require('../assets/button_share.png')

      case 'ok':
        return require('../assets/button_ok.png')

      case 'menu':
        return require('../assets/button_menu.png')

      case 'start':
        return require('../assets/button_start.png')

      case 'score':
        return require('../assets/button_score.png')
    }
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 45 * 3,
        height: 45,
        position: 'relative',
        backgroundColor: 'red',
      }}
    >
      <Image
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
        }}
        source={getPhoto()}
      />
    </TouchableOpacity>
  )
}

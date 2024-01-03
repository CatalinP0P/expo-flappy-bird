import React from 'react'
import { Image } from 'react-native'

export default function Banner({
  type,
}: {
  type: 'gameOver' | 'logo' | 'getReady'
}) {
  const getImage = () => {
    switch (type) {
      case 'gameOver':
        return require('../assets/game_over.png')

      case 'getReady':
        return require('../assets/get_ready.png')

      case 'logo':
        return require('../assets/banner.png')
    }
  }
  return <Image style={{ width: 70 * 4.94, height: 70 }} source={getImage()} />
}

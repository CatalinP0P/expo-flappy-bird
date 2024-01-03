import React from 'react'
import { Pressable } from 'react-native'

export default function GameMenu({
  menuVisibility,
  setMenuVisibility,
  setRunning,
}: {
  menuVisibility: boolean
  setMenuVisibility: React.Dispatch<React.SetStateAction<boolean>>
  setRunning: React.Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <Pressable
      style={{ flex: 1 }}
      onPress={() => {
        setRunning(true)
        setMenuVisibility(false)
      }}
    >
      <Image
        style={{
          width: 200,
          height: 200,
          translateX: '-50%',
          translateY: '-50%',
          position: 'absolute',
          left: '50%',
          top: '50%',
        }}
        source={require('./assets/start.png')}
      />
    </Pressable>
  )
}

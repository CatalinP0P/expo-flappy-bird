import React from 'react'
import { Pressable, Image } from 'react-native'
import BackgroundContainer from './backgroundContainer'
import Bird from './bird'

export default function GameMenu({
  setMenuVisibility,
  setRunning,
  birdX,
  birdY,
}: {
  setMenuVisibility: React.Dispatch<React.SetStateAction<boolean>>
  setRunning: React.Dispatch<React.SetStateAction<boolean>>
  birdX: number
  birdY: number
}) {
  const ratio = 1.25
  const width = 125
  const height = width * ratio

  return (
    <>
      <BackgroundContainer />
      <Pressable
        style={{ flex: 1 }}
        onPress={() => {
          setRunning(true)
          setMenuVisibility(false)
        }}
      >
        <Image
          style={{
            width: width,
            height: height,
            transform: [
              { translateX: -width / 2 },
              { translateY: -height / 3 },
            ],
            position: 'absolute',
            left: '58%',
            top: '58%',
          }}
          source={require('../assets/start.png')}
        />
      </Pressable>
      <Image
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          height: 80,
          width: 80 * 4,
          transform: [{ translateX: -80 * 2 }],
        }}
        source={require('../assets/get_ready.png')}
      />
      <Bird birdX={birdX} birdY={birdY} moving={true} />
    </>
  )
}

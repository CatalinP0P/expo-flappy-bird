import React from 'react'
import { Image } from 'react-native'

interface ObstacleProps {
  centerX: number
  centerY: number
}

export const obstacleWidth = 125
export const distanceBetweenObjects = 300

export default function Obstacle({ centerX, centerY }: ObstacleProps) {
  return (
    <>
      <Image
        source={require('../assets/obstacle_top.png')}
        style={{
          position: 'absolute',
          top: centerY - distanceBetweenObjects / 2 - obstacleWidth / 0.1925,
          left: centerX,
          height: obstacleWidth / 0.1925,
          width: obstacleWidth,
          // backgroundColor: 'green',
        }}
      />
      <Image
        source={require('../assets/obstacle_bottom.png')}
        style={{
          position: 'absolute',
          top: centerY + distanceBetweenObjects / 2,
          left: centerX,
          height: obstacleWidth / 0.214,
          width: obstacleWidth,
          // backgroundColor: 'green',
        }}
      />
    </>
  )
}

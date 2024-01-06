import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'

interface birdProps {
  moving: boolean
  birdX: number
  birdY: number
  size: number
  velocity: number
}

export default function Bird({
  moving,
  birdX,
  birdY,
  size,
  velocity,
}: birdProps) {
  const [imageIndex, setImageIndex] = useState(1)
  let imageIntervalId: NodeJS.Timeout

  useEffect(() => {
    if (!moving) return clearInterval(imageIntervalId)

    let direction = 1

    imageIntervalId = setInterval(() => {
      setImageIndex((imageIndex) => {
        if (imageIndex == 3) {
          direction = -1
        }
        if (imageIndex == 1) {
          direction = 1
        }

        return imageIndex + direction
      })
    }, 400)

    return () => clearInterval(imageIntervalId)
  }, [moving])

  const getImage = () => {
    switch (imageIndex) {
      case 1:
        return require('../assets/bird_1.png')
      case 2:
        return require('../assets/bird_2.png')
      case 3:
        return require('../assets/bird_3.png')
    }
  }

  const getRotationAngle = () => {
    const angle = velocity * 0.5

    if (angle > 90) return 90
    if (angle < -90) return -90

    return angle
  }

  return (
    <Image
      style={{
        position: 'absolute',
        left: birdX,
        top: birdY,
        height: size,
        width: size / 0.705,
        transform: [{ rotate: getRotationAngle() + 'deg' }],
      }}
      source={getImage()}
    />
  )
}

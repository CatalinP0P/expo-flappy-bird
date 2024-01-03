import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'

interface birdProps {
  moving: boolean
  birdX: number
  birdY: number
}

export default function Bird({ moving, birdX, birdY }: birdProps) {
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

  return (
    <Image
      style={{
        position: 'absolute',
        left: birdX,
        top: birdY,
        height: 40,
        width: 58,
      }}
      source={getImage()}
    />
  )
}

import React from 'react'
import { Text } from 'react-native'

export default function ScoreLabel({ value }: { value: number }) {
  return (
    <Text
      style={{
        position: 'absolute',
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        paddingTop: 64,
        zIndex: 10,
        fontWeight: '800',
        color: 'white',
        fontSize: 30,
      }}
    >
      {value}
    </Text>
  )
}

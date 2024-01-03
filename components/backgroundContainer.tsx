import React from 'react';
import { Image } from 'react-native';

export default function BackgroundContainer() {
  return (
    <Image
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
      source={require('../assets/background.png')}
    />
  );
}

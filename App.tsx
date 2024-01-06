import React from 'react'
import { useState } from 'react'
import GameScreen from './screens/gameScreen'
import MenuScreen from './screens/menuScreen'
import { useFonts } from 'expo-font'

export default function App() {
  const [screenIndex, setScreenIndex] = useState(1)

  const [loaded] = useFonts({
    custom: require('./assets/fonts/PressStart2P.ttf'),
  })

  if (!loaded) return

  return (
    <>
      {screenIndex == 1 && <MenuScreen setScreenIndex={setScreenIndex} />}
      {screenIndex == 2 && <GameScreen setScreenIndex={setScreenIndex} />}
    </>
  )
}

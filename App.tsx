import React from 'react'
import { useState } from 'react'
import GameScreen from './screens/gameScreen'
import MenuScreen from './screens/menuScreen'

export default function App() {
  const [screenIndex, setScreenIndex] = useState(1)

  return (
    <>
      {screenIndex == 1 && <MenuScreen setScreenIndex={setScreenIndex} />}
      {screenIndex == 2 && <GameScreen setScreenIndex={setScreenIndex} />}
    </>
  )
}

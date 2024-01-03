import React, { useEffect, useState } from 'react'
import useScreenDimensions from '../hooks/useScreenDimensions'
import GameMenu from '../components/gameMenu'
import BackgroundContainer from '../components/backgroundContainer'
import { Pressable, View, Image } from 'react-native'
import Bird from '../components/bird'
import ScoreLabel from '../components/scoreLabel'
import CustomButton from '../components/customButton'
import Banner from '../components/banner'

export default function GameScreen({
  setScreenIndex,
}: {
  setScreenIndex: React.Dispatch<React.SetStateAction<number>>
}) {
  const { screenHeight, screenWidth } = useScreenDimensions()

  const [running, setRunning] = useState(false)
  const [menuVisibility, setMenuVisibility] = useState(true)

  const [velocity, setVelocity] = useState(1)
  const gravity = 6
  const raise = 40

  const [score, setScore] = useState(0)
  const [birdX, setBirdX] = useState(screenWidth / 5)
  const [birdY, setBirdY] = useState(screenHeight / 2)

  const handleJump = () => {
    setVelocity((oldVelocity) => oldVelocity - raise)
  }

  let gameIntervalId: NodeJS.Timeout

  useEffect(() => {
    if (!running) {
      clearInterval(gameIntervalId)
      return
    }

    if (birdY < 0) {
      setBirdY(0)
      setRunning(false)
      clearInterval(gameIntervalId)
      return
    }

    if (birdY + 58 > screenHeight) {
      setBirdY(screenHeight - 58)
      setRunning(false)
      clearInterval(gameIntervalId)
      return
    }

    gameIntervalId = setInterval(() => {
      setVelocity((oldVelocity) => oldVelocity + gravity)
      setBirdY((oldBirdY) => oldBirdY + velocity)
    }, 1000 / 30)

    return () => {
      clearInterval(gameIntervalId)
    }
  }, [birdY, running])

  const handleOkButton = () => {
    setScreenIndex(1)
    setVelocity(1)
    setRunning(false)
    setScore(0)
    clearInterval(gameIntervalId)
    setMenuVisibility(true)
    setBirdX(screenWidth / 4)
    setBirdY(screenHeight / 2)
  }

  return (
    <>
      {menuVisibility && (
        <GameMenu
          birdX={birdX}
          birdY={birdY}
          setMenuVisibility={setMenuVisibility}
          setRunning={setRunning}
        />
      )}
      {!menuVisibility && (
        <>
          <ScoreLabel value={score} />
          <BackgroundContainer />
          <Pressable onPress={handleJump} style={{ flex: 1 }}>
            <Bird moving={running} birdX={birdX} birdY={birdY} />
          </Pressable>
          {!running && (
            <View
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 24,
                  alignItems: 'center',
                }}
              >
                <Banner type="gameOver" />
                <View style={{ position: 'relative', width: 350, height: 175 }}>
                  <Image
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      width: '100%',
                      height: '100%',
                    }}
                    source={require('../assets/modal.png')}
                  />
                  <Image
                    style={{
                      height: 60,
                      width: 60,
                      position: 'absolute',
                      left: 44,
                      top: 67,
                    }}
                    source={require('../assets/medal_1.png')}
                  />
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: 350,
                    paddingTop: 50,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <CustomButton type="ok" onPress={handleOkButton} />

                  <CustomButton type="share" />
                </View>
              </View>
            </View>
          )}
        </>
      )}
    </>
  )
}

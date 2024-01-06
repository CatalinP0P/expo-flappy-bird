import React, { useEffect, useState } from 'react'
import useScreenDimensions from '../hooks/useScreenDimensions'
import GameMenu from '../components/gameMenu'
import BackgroundContainer from '../components/backgroundContainer'
import { Pressable, View, Image, Text } from 'react-native'
import Bird from '../components/bird'
import ScoreLabel from '../components/scoreLabel'
import CustomButton from '../components/customButton'
import Banner from '../components/banner'
import Obstacle, {
  distanceBetweenObjects,
  obstacleWidth,
} from '../components/obstacle'
import { getRandomValue } from '../utils/getRandomValue'
import { doRectanglesIntersect } from '../utils/doRectanglesIntersect'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function GameScreen({
  setScreenIndex,
}: {
  setScreenIndex: React.Dispatch<React.SetStateAction<number>>
}) {
  const [obstacles, setObstacles] = useState<
    { centerX: number; centerY: number; past: boolean }[]
  >([])
  const { screenHeight, screenWidth } = useScreenDimensions()

  const [running, setRunning] = useState(false)
  const [menuVisibility, setMenuVisibility] = useState(true)

  const [velocity, setVelocity] = useState(1)
  const gravity = 6
  const raise = 40

  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [birdX, setBirdX] = useState(screenWidth / 5)
  const [birdY, setBirdY] = useState(screenHeight / 2)
  const birdSize = 52

  const getBestScore = async () => {
    const x = await AsyncStorage.getItem('best_score')
    setBestScore(parseInt(x as string) | 0)
  }

  useEffect(() => {
    getBestScore()
  }, [])

  const updateBestScore = async () => {
    if (score < bestScore) return
    await AsyncStorage.setItem('best_score', score + '')
    setBestScore(score)
  }

  const checkForScoreIncrease = () => {
    setObstacles((obstacles) =>
      obstacles.map((obstacle) => {
        if (obstacle.centerX < birdX + birdSize / 2 && obstacle.past == false) {
          setScore((oldScore) => oldScore + 1)
          return { ...obstacle, past: true }
        }
        return obstacle
      }),
    )
  }

  const checkForIntersection = () => {
    const birdRectangle = {
      x1: birdX - birdSize / 3,
      y1: birdY - birdSize / 3,
      x2: birdX + birdSize / 3,
      y2: birdY + birdSize / 3,
    }
    obstacles.forEach((obstacle) => {
      if (
        doRectanglesIntersect(
          {
            x1: obstacle.centerX - obstacleWidth / 2,
            y1: 0,
            x2: obstacle.centerX + obstacleWidth / 2,
            y2: obstacle.centerY - distanceBetweenObjects / 2,
          },
          birdRectangle,
        ) ||
        doRectanglesIntersect(
          {
            x1: obstacle.centerX - obstacleWidth / 2,
            y1: obstacle.centerY + distanceBetweenObjects / 2,
            x2: obstacle.centerX + obstacleWidth / 2,
            y2: screenHeight,
          },
          birdRectangle,
        )
      ) {
        setRunning(false)
      }
    })
  }

  const moveObstacles = () => {
    if (obstacles.length < 1) return

    setObstacles((oldObstacles) => {
      return oldObstacles.map((obstacle) => {
        return { ...obstacle, centerX: obstacle.centerX - 7 }
      })
    })
  }

  const removePastObstacles = () => {
    setObstacles((oldObstacles) =>
      oldObstacles.filter((obstacles) => obstacles.centerX + 200 > 0),
    )
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setObstacles((oldObstacles) => {
        return [
          ...oldObstacles,
          {
            centerX: screenWidth,
            centerY: getRandomValue(150, screenHeight - 150),
            past: false,
          },
        ]
      })
    }, 2500)

    if (!running) {
      clearInterval(interval)
    }
  }, [running])

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
      moveObstacles()
      removePastObstacles()
      checkForIntersection()
      checkForScoreIncrease()
    }, 1000 / 30)

    return () => {
      updateBestScore()
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
          velocity={velocity}
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
            <Bird
              moving={running}
              birdX={birdX}
              birdY={birdY}
              size={birdSize}
              velocity={velocity}
            />
            {obstacles.map((obstacle) => {
              return (
                <Obstacle
                  key={Math.random() * 1000}
                  centerX={obstacle.centerX}
                  centerY={obstacle.centerY}
                />
              )
            })}
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
                  <Text
                    style={{
                      position: 'absolute',
                      fontSize: 16,
                      top: 50,
                      right: 32,
                      fontFamily: 'custom',
                      color: 'white',
                    }}
                  >
                    {score}
                  </Text>

                  <Text
                    style={{
                      position: 'absolute',
                      fontSize: 16,
                      top: 120,
                      right: 32,
                      fontFamily: 'custom',
                      color: 'white',
                    }}
                  >
                    {bestScore}
                  </Text>

                  {score >= 5 && (
                    <Image
                      style={{
                        height: 60,
                        width: 60,
                        position: 'absolute',
                        left: 44,
                        top: 67,
                      }}
                      source={
                        score >= 25
                          ? require('../assets/medal_1.png')
                          : score >= 20
                            ? require('../assets/medal_2.png')
                            : score >= 10
                              ? require('../assets/medal_3.png')
                              : require('../assets/medal_4.png')
                      }
                    />
                  )}
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

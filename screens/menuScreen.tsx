import React from 'react'
import { View } from 'react-native'
import BackgroundContainer from '../components/backgroundContainer'
import Banner from '../components/banner'
import CustomButton from '../components/customButton'

export default function MenuScreen({
  setScreenIndex,
}: {
  setScreenIndex: React.Dispatch<React.SetStateAction<number>>
}) {
  return (
    <>
      <BackgroundContainer />
      <View
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Banner type="logo" />
        <View
          style={{
            width: 350,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 128,
          }}
        >
          <CustomButton type="start" onPress={() => setScreenIndex(2)} />
          <CustomButton type="score" />
        </View>
      </View>
    </>
  )
}

import React from 'react'
import { ImageBackground, View } from 'react-native'

import * as styles from './styles'
import { color, images } from '../../theme'
import { Button, Screen, Text } from '../../components'

export const SuccessScreen = () => {
  return (
    <Screen style={styles.mainView()} bgColor={color.transparent} translucent={true}>
      <ImageBackground source={images.ImgOrderComplete} style={styles.imgBG()}>
        <View style={styles.successContainer()}>
          <Text style={styles.successTitle()}>Success!</Text>
          <Text style={styles.successMessage()}>Your order will be delivered soon. Thank you for choosing our app!</Text>
          <Button 
            title='Continue Shopping'
            btnStyle={styles.button()}
          />
        </View>
      </ImageBackground>
    </Screen>
  )
}

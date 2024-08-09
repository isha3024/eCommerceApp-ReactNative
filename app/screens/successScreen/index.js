import React, { useEffect } from 'react'
import { BackHandler, ImageBackground, Platform, ToastAndroid, View } from 'react-native'

import * as styles from './styles'
import { color, images } from '../../theme'
import { Button, Screen, Text } from '../../components'
import { useNavigation } from '@react-navigation/native'

export const SuccessScreen = () => {


  const navigation = useNavigation();
  let currentCount = 0;

  useEffect(() => {

    const backAction = () => {
      if (currentCount < 1) {
        currentCount += 1;
        ToastAndroid.show('Press back again to return to the home screen', ToastAndroid.SHORT);
      } else {
        navigation.navigate('homeStackNavigation')
      }
      setTimeout(() => {
        currentCount = 0;
      }, 2000);
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove()

  },[])

  return (
    <Screen style={styles.mainView()} bgColor={color.transparent} translucent={true}>
      <ImageBackground source={images.ImgOrderComplete} style={styles.imgBG()}>
        <View style={styles.successContainer()}>
          <Text style={styles.successTitle()}>Success!</Text>
          <Text style={styles.successMessage()}>Your order will be delivered soon. Thank you for choosing our app!</Text>
          <Button 
            title='Continue Shopping'
            btnStyle={styles.button()}
            onPress={() => navigation.navigate('homeStackNavigation')}
          />
        </View>
      </ImageBackground>
    </Screen>
  )
}

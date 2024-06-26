import React from 'react'
import { View, StatusBar, ImageBackground, TouchableOpacity } from 'react-native'
import { Screen, Text, Title } from '../../components'

import * as styles from './styles';
import { images } from '../../theme';
import LinearGradient from 'react-native-linear-gradient';

export const OnBoardingScreen = () => {
  return (
    <Screen withScroll bgColor>
    <StatusBar
      backgroundColor="transparent"
      translucent={true}
    />
    <TouchableOpacity activeOpacity={0.8} style={styles.topView()}>
        <ImageBackground source={images.imgOnBoardingImageBanner} style={styles.imageBg()}>
        <LinearGradient 
          colors={['rgba(0, 0, 0, .4)', 'rgba(255, 255, 255, 0)']} 
          start={{x: 0, y: 1}} 
          locations={[0.2, 0.5]}
          end={{x: 0, y: 0}} style={styles.linearGradient()}>
        <View style={styles.imageOverlayText()}>
            <Title title='New Collection' customStyles={styles.title()} />
          </View>
        </LinearGradient>    
        </ImageBackground>
      </TouchableOpacity>
      <View style={styles.bottomView()}>
        <View style={styles.leftView()}>
          <TouchableOpacity activeOpacity={0.3} style={styles.upperLeftView()}>
            <Text style={styles.textRed()}>Summer Sale</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8}>
            <ImageBackground style={styles.bottomLeftView()} source={images.imgOnBoardingImageBlack}>
              <Text style={styles.textOverlay()}>Black</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <TouchableOpacity activeOpacity={0.8}>
          <ImageBackground source={images.imgOnBoardingImageMenHoodie} style={styles.rightView()}>
          <LinearGradient 
            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.1)']} 
            start={{x: 1, y: 1}} 
            locations={[0, 0.5, 1]}
            end={{x: 0.5, y: 0.5}} style={styles.linearGradient2()}>
            <Text style={styles.imageRightText()}>Men's Hoodie</Text>
            </LinearGradient>
          </ImageBackground>
          </TouchableOpacity>
      </View>
    </Screen>
  )
}

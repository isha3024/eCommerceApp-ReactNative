import React, { useCallback } from 'react'
import { View, ScrollView, Dimensions, Image, StatusBar } from 'react-native'
import Animated from 'react-native-reanimated';

import * as styles from './styles'
import { Text } from '../../components';
import { color, fontSize, size } from '../../theme';
import { useFocusEffect } from '@react-navigation/native';


// const width = Dimensions.get('window')

export const ImagesScreen = ({ route }) => {

  useFocusEffect(useCallback(() => {
    StatusBar.setBackgroundColor(color.mostlyBlack);
    StatusBar.setBarStyle('light-content')
  }))

  const capturesImages = route.params.photos;
  // console.log('capturesImages::', capturesImages)
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled={true}
      style={styles.imageScrollView()}
      contentContainerStyle={{ alignItems: 'center' }}>
      {[...capturesImages].reverse().map((photo, index) => (
        <View key={index}>
          <Animated.Image
            source={{ uri: 'file://' + photo.path }}
            style={{width: size.deviceWidth, height: size.deviceHeight}}
            sharedTransitionTag = {index === 0 ? 'imageFullScreen' : index.toString()}
          />
        </View>
      ))}
    </ScrollView>
  )
}

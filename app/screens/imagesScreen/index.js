import React, { useCallback } from 'react';
import { View, ScrollView, StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { color, size } from '../../theme';
import * as styles from './styles';

export const ImagesScreen = ({ route }) => {
  const capturedImages = route.params.photos;
  const scales = capturedImages.map(() => useSharedValue(1));
  const savedScales = capturedImages.map(() => useSharedValue(1));


  const createPinchGesture = (index) => {
    return Gesture.Pinch()
    .onUpdate((e) => {
     const newScale =  savedScales[index].value * e.scale;
     if(newScale >= 1) {
      scales[index].value = newScale
     }
    })
    .onEnd(() => {
      if (scales[index].value < 1) {
        scales[index].value = 1;
      }
      savedScales[index].value = scales[index].value;
    });
  }

  const createDoubleTapGesture = (index) => {
    return Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      if (scales[index].value > 1) {
        scales[index].value = withSpring(1);
        savedScales[index].value = 1      
      }
      else {
        scales[index].value = withSpring(2);
        savedScales[index].value = 2;
      }
      
    });
  }

  const animatedStyle = (index) => useAnimatedStyle(() => ({
    transform: [{ scale: scales[index].value }]
  }));

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBackgroundColor(color.mostlyBlack);
      StatusBar.setBarStyle('light-content');
    }, [])
  );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled={true}
      style={styles.imageScrollView()}
      contentContainerStyle={{ alignItems: 'center' }}
    >
      {[...capturedImages].reverse().map((photo, index) => (
        <View key={index}>
          <GestureDetector gesture={Gesture.Exclusive(createPinchGesture(index), createDoubleTapGesture(index))}>
            <Animated.Image
              source={{ uri: 'file://' + photo.path }}
              style={[{ width: size.deviceWidth, height: size.deviceHeight }, animatedStyle(index)]}
              sharedTransitionTag={index === 0 ? 'imageFullScreen' : index.toString()}
            />
          </GestureDetector>
        </View>
      ))}
    </ScrollView>
  );
};

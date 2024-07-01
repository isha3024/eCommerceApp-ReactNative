import React from 'react'
import {TextInput, View } from 'react-native'

import * as styles from './styles'
import Animated, { useAnimatedStyle, useSharedValue, useAnimatedGestureHandler, useAnimatedProps, runOnJS} from 'react-native-reanimated'
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler'

export const PriceRange = ({min, max, steps, onValueChange, sliderWidth}) => {

  const position = useSharedValue(0);
  const positionTwo = useSharedValue(sliderWidth - 58);
  const zIndex = useSharedValue(0);
  const zIndexTwo = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = position.value;
    },
    onActive: (e, ctx) => {
      if(ctx.startX + e.translationX < 0){
        position.value = 0;
      }else if(ctx.startX + e.translationX > positionTwo.value){
        position.value = positionTwo.value;
        zIndex.value = 1;
        zIndexTwo.value = 0;
      }else {
        position.value = ctx.startX + e.translationX;
      }
    },
    onEnd: () => {
      runOnJS(onValueChange)({
        min: min +
        Math.floor(position.value / (sliderWidth / ((max - min) / steps))) * 
        steps,
        max: min + 
        Math.floor(positionTwo.value / (sliderWidth / ((max- min) / steps))) * 
        steps
      })
    }
  })

  const gestureHandlerTwo = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = positionTwo.value;
    },
    onActive: (e, ctx) => {
      if(ctx.startX + e.translationX > sliderWidth - 58){
        positionTwo.value = sliderWidth - 58;
      }else if(ctx.startX + e.translationX < position.value){
        positionTwo.value = position.value
        zIndex.value = 0;
        zIndexTwo.value = 1;
      }else {
        positionTwo.value = ctx.startX + e.translationX;
      }
    },
    onEnd: () => {
      runOnJS(onValueChange)({
        min: min +
        Math.floor(position.value / (sliderWidth / ((max - min) / steps))) * steps,
        max: min + 
        Math.floor(positionTwo.value / (sliderWidth / ((max- min) / steps))) * 
        steps
      })
    }
  })

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: position.value
      }
    ],
    zIndex: zIndex.value
  }))

  const animatedStyleTwo = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: positionTwo.value
      }
    ],
    zIndex: zIndexTwo.value
  }))

  const sliderStyle = useAnimatedStyle(() => ({
    transform: [{translateX: position.value}],
    width: positionTwo.value - position.value
  }))

  Animated.addWhitelistedNativeProps(true);
  const AnimatedText = Animated.createAnimatedComponent(TextInput);
  const minLabelText = useAnimatedProps(() => {
    return {
      text: `$${
        min +
        Math.floor(position.value / (sliderWidth / ((max - min) / steps))) * steps
      }`
    }
  })
  const maxLabelText = useAnimatedProps(() => ({
    text: `${
      min +
      Math.floor(positionTwo.value / (sliderWidth / ((max - min) / steps))) * steps
    }`
  }))

  return (
    <GestureHandlerRootView>
      <View style={styles.rangeContainer()}>
        <View style={styles.labelContainer()}>
          <AnimatedText 
            style={styles.label()} 
            animatedProps={minLabelText} 
            editable={false}
            defaultValue={`$${
              min +
              Math.floor(position.value / (sliderWidth / ((max - min) / steps))) * steps
              }`
            }
          />
          <AnimatedText 
            style={styles.label()} 
            animatedProps={maxLabelText} 
            editable={false}
            defaultValue={`$${
              min +
              Math.floor(positionTwo.value / (sliderWidth / ((max - min) / steps))) * steps
              }`
            }
          />
        </View>
        <View>
          <View style={styles.trackBack()} />
          <Animated.View style={[styles.trackFront(), sliderStyle]} />
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={[styles.thumb(), animatedStyle]} />
          </PanGestureHandler>
          <PanGestureHandler onGestureEvent={gestureHandlerTwo}>
            <Animated.View style={[styles.thumb(), animatedStyleTwo]} />
          </PanGestureHandler>
        </View>
      </View>
    </GestureHandlerRootView>
  )
}

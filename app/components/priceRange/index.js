import React, { memo } from 'react';
import { TextInput, View } from 'react-native';
import * as styles from './styles';
import Animated, { useAnimatedStyle, useSharedValue, useAnimatedProps, runOnJS } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const PriceRange = ({ min, max, steps, onValueChange, sliderWidth }) => {
  const position = useSharedValue(0);
  const positionTwo = useSharedValue(sliderWidth);
  const context = useSharedValue(0);
  const contextTwo = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(() => {
      context.value = position.value;
    })
    .onUpdate(e => {
      if (context.value + e.translationX < 0) {
        position.value = 0;
      } else if (context.value + e.translationX > positionTwo.value) {
        position.value = positionTwo.value;
      } else {
        position.value = context.value + e.translationX;
      }
    })
    .onEnd(() => {
      runOnJS(onValueChange)({
        min: min + Math.floor(position.value / (sliderWidth / ((max - min) / steps))) * steps,
        max: min + Math.floor(positionTwo.value / (sliderWidth / ((max - min) / steps))) * steps,
      });
    });

  const panTwo = Gesture.Pan()
    .onBegin(() => {
      contextTwo.value = positionTwo.value;
    })
    .onUpdate(e => {
      if (contextTwo.value + e.translationX > sliderWidth) {
        positionTwo.value = sliderWidth;
      } else if (contextTwo.value + e.translationX < position.value) {
        positionTwo.value = position.value;
      } else {
        positionTwo.value = contextTwo.value + e.translationX;
      }
    })
    .onEnd(() => {
      runOnJS(onValueChange)({
        min: min + Math.floor(position.value / (sliderWidth / ((max - min) / steps))) * steps,
        max: min + Math.floor(positionTwo.value / (sliderWidth / ((max - min) / steps))) * steps,
      });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));

  const animatedStyleTwo = useAnimatedStyle(() => ({
    transform: [{ translateX: positionTwo.value }],
  }));

  const sliderStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
    width: positionTwo.value - position.value,
  }));

  const AnimatedText = Animated.createAnimatedComponent(TextInput);
  const minLabelText = useAnimatedProps(() => ({
    text: `$${
      min +
      Math.floor(position.value / (sliderWidth / ((max - min) / steps))) * steps
    }`,
  }));

  const maxLabelText = useAnimatedProps(() => ({
    text: `$${
      min +
      Math.floor(positionTwo.value / (sliderWidth / ((max - min) / steps))) * steps
    }`,
  }));

  return (
    <View style={styles.rangeContainer()}>
      <View style={styles.labelContainer()}>
        <AnimatedText
          style={styles.label()}
          animatedProps={minLabelText}
          editable={false}
          defaultValue={`$${
            min +
            Math.floor(position.value / (sliderWidth / ((max - min) / steps))) * steps
          }`}
        />
        <AnimatedText
          style={styles.label()}
          animatedProps={maxLabelText}
          editable={false}
          defaultValue={`$${
            min +
            Math.floor(positionTwo.value / (sliderWidth / ((max - min) / steps))) * steps
          }`}
        />
      </View>
      <View>
        <View style={styles.trackBack()} />
        <Animated.View style={[styles.trackFront(), sliderStyle]} />
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.thumb(), animatedStyle]} />
        </GestureDetector>
        <GestureDetector gesture={panTwo}>
          <Animated.View style={[styles.thumb(), animatedStyleTwo]} />
        </GestureDetector>
      </View>
    </View>
  );
};

export default memo(PriceRange);
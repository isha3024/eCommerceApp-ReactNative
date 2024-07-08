import React, { act, useEffect, useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import Animated, {interpolateColor, useSharedValue, useAnimatedStyle, withSpring, withTiming, useDerivedValue} from 'react-native-reanimated'

import * as styles from './styles'

export const SwitchButton = ({value, onChange}) => {

  const [active, setActive] = useState(false);
  const switchTranslate = useSharedValue(0)

  useEffect(() => {
    if(active){
      switchTranslate.value = 15
    }else {
      switchTranslate.value = 0
    }
  },[active, switchTranslate])

  const progress = useDerivedValue(() => {
    return withTiming(active ? 15 : 0)
  })

  const backgroundColorStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 15],
      ['#9b9b9b55', '#9b9b9b55']
    );
    return {
      backgroundColor,
    }
  })

  const customSpringStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(switchTranslate.value, {
            mass: 1,
            damping: 15,
            stiffness: 120,
            overshootClamping: false,
            restSpeedThreshold: 0.001,
            restDisplacementThreshold: 0.001
          })
        }
      ]
    }
  })

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => setActive(!active)} onChange={onChange}>
      <Animated.View style={[styles.containerStyle(), backgroundColorStyle]}>
        <Animated.View style={[styles.circle(active), customSpringStyle]}/>
      </Animated.View>
    </TouchableOpacity>
  )
}

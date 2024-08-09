import React, { useEffect, useRef, useState } from 'react'
import { View, TextInput, Animated, Easing } from 'react-native'

import { color, fontSize, fonts } from '../../theme'
import * as styles from './styles'

export const InputField = ({
  error,
  placeholder,
  value,
  icon,
  iconPlace,
  renderRightIcon,
  inputLeftIcon,
  label,
  labelTextColor,
  customFocusStyles,
  customTextInputStyles,
  onChangeText,
  onFocus,
  onBlur,
  onPress,
  maxLength,
  multiline,
  autoCapitalize,
  editable,
  keyboardType,
  returnKeyType,
  secureTextEntry,
  selectionColor,
  onSubmitEditing,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const focusAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused ? 1 : 0,
      duration: 100,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: false

    }).start()
  }, [focusAnim, isFocused])
  return (
    <Animated.View style={[styles.rootContainer(error, editable)]}>
      {isFocused && <Animated.Text style={[
        styles.labelText(),
        {
          transform: [
            {
              translateY: focusAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -13],
              }),
            },
          ],
          fontFamily: isFocused ? fonts.metropolisRegular : fonts.metropolisMedium,
          fontSize: isFocused ? fontSize.mediumSmall : fontSize.small,
        },
      ]}>{isFocused && label}</Animated.Text>}
      <TextInput
        placeholder={isFocused ? '' : placeholder}
        placeholderTextColor={isFocused ? '' : color.darkGray}
        style={[
          styles.inputField('', isFocused), customTextInputStyles]}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onPress={onPress}
        maxLength={maxLength}
        multiline={multiline}
        autoCapitalize={autoCapitalize ?? 'none'}
        editable={editable}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        secureTextEntry={secureTextEntry}
        selectionColor={selectionColor ?? color.veryDarkGray}
        onSubmitEditing={onSubmitEditing}
        {...props}
      />
      <View style={styles.rightIcon()}>
        {icon && iconPlace === 'right' ? (
          renderRightIcon()
        ) : null}
      </View>
    </Animated.View>
  )
}

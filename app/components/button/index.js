import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';

import { Text } from '../text';
import * as styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome'

export const Button = ({ title, onPress, activeOpacity, btnStyle, btnTextStyle, disabled, border, icon, renderIcon }) => {

  const [isDisabled, setIsDisabled] = useState(disabled);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={activeOpacity ?? 0.7}
      disabled={isDisabled}
      style={[
        styles.btnContainer(isDisabled, border), 
        btnStyle]}
    >
    {icon ? (
        renderIcon()
      ) : null}
      <Text style={[styles.titleStyle(), btnTextStyle, border && styles.titleStyle2()]}>{title}</Text>
    </TouchableOpacity>
  );
};

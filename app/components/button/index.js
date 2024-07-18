import React, { useState, useEffect } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';

import { Text } from '../text';
import * as styles from './styles';
import { color } from '../../theme';

export const Button = ({ title, onPress, activeOpacity, btnStyle, btnTextStyle, disabled, border, icon, renderIcon, loading }) => {
  const [isDisabled, setIsDisabled] = useState(disabled || loading);
  
  useEffect(() => {
    setIsDisabled(disabled || loading)
  },[disabled, loading])


  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={activeOpacity ?? 0.7}
      disabled={isDisabled}
      style={[
        styles.btnContainer(isDisabled, border), 
        btnStyle]}
    >
    { loading 
      ? (<ActivityIndicator color={color.white}/>) 
      : (<>{icon && renderIcon ? renderIcon() : null}</>)
    }
      <Text style={[styles.titleStyle(), btnTextStyle, border && styles.titleStyle2()]}>{title}</Text>
    </TouchableOpacity>
  );
};

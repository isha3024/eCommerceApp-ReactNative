import React from 'react';
import {Image, View} from 'react-native';
import {images} from '../../theme';
import * as styles from './styles';

export const SplashScreen = () => {
  return (
    <View style={styles.rootContainer()}>
      <Image source={images.imgAppNewLogo} style={styles.appLogo()} />
    </View>
  );
};

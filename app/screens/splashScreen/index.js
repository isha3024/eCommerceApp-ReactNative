import React from 'react';
import {Image, StatusBar} from 'react-native';
import {color, images} from '../../theme';
import * as styles from './styles';
import { Screen } from '../../components';

export const SplashScreen = () => {
  return (
    <Screen bgColor={color.primary} style={styles.rootContainer()}>
      <StatusBar translucent={true} />
      <Image source={images.imgAppLogoMain} style={styles.appLogo()} />
    </Screen>
  );
};

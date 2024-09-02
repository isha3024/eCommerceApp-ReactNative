import React from 'react';
import {Image, StatusBar} from 'react-native';
import {color, images, lottieIcons, size} from '../../theme';
import * as styles from './styles';
import { Screen } from '../../components';
import LottieView from 'lottie-react-native';

export const SplashScreen = () => {
  return (
    <Screen bgColor={color.primary} style={styles.rootContainer()}>
      <StatusBar translucent={true} />
      <LottieView 
        source={lottieIcons.spalshAnimation}
        autoPlay={true}
        loop={true}
        width={size.moderateScale(300)}
        height={size.moderateScale(400)}
      />
    </Screen>
  );
};

import React from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';

import {lottieIcons} from '../../theme';
import * as styles from './styles';

export const Loader = () => {
  return (
    <View style={styles.mainView()}>
      <LottieView
        source={lottieIcons.dottedLoader}
        autoPlay
        loop
        style={styles.lottieImage()}
      />
      {/* <View style={styles.imageOverlay()}> */}
      {/* <ActivityIndicator size={'large'} color={color.gray100} /> */}
      {/* </View> */}
    </View>
  );
};

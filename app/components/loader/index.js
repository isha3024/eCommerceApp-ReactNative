import React from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';

import {lottieIcons} from '../../theme';
import * as styles from './styles';

export const Loader = ({height}) => {
  return (
    <View style={styles.mainView(height)}>
      <LottieView
        source={lottieIcons.dottedLoader}
        autoPlay
        loop
        style={styles.lottieImage()}
      />
    </View>
  );
};

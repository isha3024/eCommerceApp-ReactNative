import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar, TouchableOpacity, View } from 'react-native';

import { Screen, Text } from '../../components';
import * as styles from './styles';

const statusbarHeight = StatusBar.currentHeight;


export const DemoScreen = () => {

  return (
    <Screen style={styles.mainView(statusbarHeight)}>
      
    </Screen>
  );
};

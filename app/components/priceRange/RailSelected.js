import React, { memo } from 'react';
import {StyleSheet, View} from 'react-native';
import { color } from '../../theme';

const RailSelected = () => {
  return (
    <View style={styles.root}/>
  );
};

export default memo(RailSelected);

const styles = StyleSheet.create({
  root: {
    height: 3,
    backgroundColor: color.secondary,
  },
});
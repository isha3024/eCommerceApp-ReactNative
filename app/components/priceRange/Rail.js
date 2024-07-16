import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { color } from '../../theme';

const Rail = () => {
  return (
    <View style={styles.root}/>
  );
};

export default memo(Rail);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: 3,
    backgroundColor: color.darkGray,
  },
});
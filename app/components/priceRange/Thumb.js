import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import { color, size } from '../../theme';

const THUMB_RADIUS_LOW = 12;

const Thumb = ({name}) => {
  return <View style={name === 'high' ? styles.rootHigh : styles.rootLow} />;
};

const styles = StyleSheet.create({
  rootLow: {
    width: size.moderateScale(22),
    height: size.moderateScale(22),
    borderRadius: THUMB_RADIUS_LOW,
    backgroundColor: color.secondary,
  },
  rootHigh: {
    width: size.moderateScale(22),
    height: size.moderateScale(22),
    borderRadius: THUMB_RADIUS_LOW,
    backgroundColor: color.secondary,
  },
});

export default memo(Thumb);
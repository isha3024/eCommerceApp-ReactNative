// INFO: custom calculations for responsive UI

import {Dimensions, Platform} from 'react-native';
import {hasNotch} from 'react-native-device-info';

const {width, height} = Dimensions.get('window');

const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

// Default guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => (shortDimension / guidelineBaseWidth) * size;

const verticalScale = size => (longDimension / guidelineBaseHeight) * size;

const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const isIPhoneXSize = dim => {
  return dim.height === 812 || dim.width === 812;
};

const isIPhoneXrSize = dim => {
  return dim.height === 896 || dim.width === 896;
};

const isIphoneX = () => {
  const dim = Dimensions.get('window');
  return (
    // This has to be iOS
    Platform.OS === 'ios' &&
    // Check either, iPhone X or XR
    (isIPhoneXSize(dim) || isIPhoneXrSize(dim))
  );
};

const isIpadSize = dim => {
  return dim.height === 1024 || dim.width === 1024;
};

const isIpad = () => {
  const dim = Dimensions.get('window');
  return (
    // This has to be iOS
    Platform.OS === 'ios' &&
    // Check either, iPhone X or XR
    isIpadSize(dim)
  );
};

const notchPresent = () => {
  return hasNotch();
};

const deviceWidth = width;

const deviceHeight = height;

export const size = {
  scale,
  moderateScale,
  verticalScale,
  deviceWidth,
  deviceHeight,
  isIphoneX,
  isIpad,
  notchPresent,
};

import {color, size} from '../../theme';

export const mainView = (height) => ({
  zIndex: 100000,
  alignSelf: 'center',
  justifyContent: 'center',
  backgroundColor: color.primary,
  height: height ?? size.deviceHeight,
  flex: 1,
  width: size.deviceWidth * 2,
  position: 'absolute',
  transform: [{scale: 2}],
});

export const lottieImage = () => ({
  height: size.moderateScale(50),
  width: size.moderateScale(70),
  position: 'absolute',
  alignSelf: 'center',
  justifyContent: 'center',
});

import {color, size} from '../../theme';

export const mainView = () => ({
  zIndex: 100000,
  alignSelf: 'center',
  justifyContent: 'center',
  backgroundColor: color.primary,
  height: size.deviceHeight,
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
  //   // flexGrow: 1,
  //   // zIndex: 1,
  //   // top: size.deviceHeight * 0.4,

  //   // backgroundColor: color.gray1100,
});
// export const imageOverlay = () => ({
//   alignSelf: 'center',
//   justifyContent: 'center',
//   height: size.deviceHeight,
//   width: size.deviceWidth,
//   resizeMode: 'contain',
//   borderRadius: size.moderateScale(50),
//   // backgroundColor: color.white,
//   zIndex: -1,
// });

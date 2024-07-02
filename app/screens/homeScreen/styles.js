import {color, fontSize, fonts, size} from '../../theme';

export const topView = () => ({});
export const imageBg = () => ({
  width: size.deviceWidth,
  height: size.deviceHeight * (2.5/4)
});

export const imageOverlayText = () => ({
  width: size.deviceWidth * 0.6,
  position: 'absolute',
  bottom: size.moderateScale(32),
  left: size.moderateScale(15)
});

export const linearGradient = () => ({
  flex: 1
});

export const title = () => ({
  color: color.white,
  fontSize: fontSize.extraLarge,
  fontFamily: fonts.metropolisBold
});

export const buttonTop = () => ({
  marginTop: size.moderateScale(18),
  width: size.moderateScale(135),
  paddingVertical:size.moderateScale(10)
});

export const bottomTabView = () => ({
  marginTop: size.moderateScale(30),
  paddingLeft: size.moderateScale(15),
});

export const productListHorizontalTop = () => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingRight: size.moderateScale(15)
});

export const link = () => ({
  fontSize: fontSize.mediumSmall,
  color: color.mostlyBlack,
  fontFamily: fonts.metropolisRegular,
  marginBottom: size.moderateScale(15)
});

export const textLight = () => ({
  fontSize: fontSize.mediumSmall,
  color: color.darkGray,
  fontFamily: fonts.metropolisRegular,
  marginTop: size.moderateScale(4),
  marginBottom: size.moderateScale(20)
});

export const productCardHome = () => ({
  marginRight: size.moderateScale(16)
});


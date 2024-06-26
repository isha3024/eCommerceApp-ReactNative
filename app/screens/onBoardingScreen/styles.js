import { color, fontSize, fonts, size } from "../../theme";
import { flexContainer } from "../profileScreen/styles";

export const topView = () => ({
  height: size.deviceHeight * 0.45,
  elevation: size.moderateScale(10),
  backgroundColor: color.primary,
});

export const imageBg = () => ({
  width: size.deviceWidth,
  height: '100%',
  resizeMode: 'contain'
});

export const imageOverlayText = () => ({
  position: 'absolute',
  bottom: size.moderateScale(27),
  right: size.moderateScale(18)
});

export const linearGradient = () => ({
  flex: 1
});

export const title = () => ({
  color: color.white,
  fontSize: fontSize.middleLarge,
  fontFamily: fonts.metropolisBold
});
export const bottomView = () => ({
  flexDirection: 'row',
  paddingBottom: size.moderateScale(50)
});
export const leftView = () => ({
  width: size.deviceWidth * 0.5
});
export const upperLeftView = () => ({
  height: size.deviceHeight * 0.25,
  backgroundColor: color.white,
  zIndex: size.moderateScale(-1),
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
})

export const textRed = () => ({
  color: color.secondary,
  fontFamily: fonts.metropolisBold,
  fontSize: fontSize.middleLarge,
})

export const bottomLeftView = () => ({
  flex: 1,
  height: size.deviceHeight * 0.3,
  alignItems: 'flex-start',
  justifyContent: 'flex-end',
  paddingHorizontal: size.moderateScale(15),
  paddingVertical: size.moderateScale(60)
});

export const textOverlay = () => ({
  color: color.white,
  fontSize: fontSize.middleLarge,
  fontFamily: fonts.metropolisBold,
});

export const rightView = () => ({
  width: size.deviceWidth * 0.5,
  height: size.deviceHeight * 0.55,
});

export const linearGradient2 = () => ({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
});

export const imageRightText = () => ({
  fontSize: fontSize.middleLarge,
  fontFamily: fonts.metropolisBold,
  color: color.white
});

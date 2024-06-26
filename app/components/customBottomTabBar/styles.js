import { color, fontSize, fonts, size } from "../../theme";

export const mainBottomContainer = () => ({
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  height: size.moderateScale(60),
  borderTopLeftRadius: size.moderateScale(12),
  borderTopRightRadius: size.moderateScale(12),
  backgroundColor: color.white,
  elevation: size.moderateScale(10),
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  width: size.deviceWidth,
})

export const bottomBarItem = () => ({
  alignItems: 'center',
})

export const iconView = () => ({
  alignItems: 'center',
  marginBottom: size.moderateScale(5)
})

export const screenLabel = (isFocused) => ({
  color: isFocused ? color.secondary : color.darkGray,
  fontSize: fontSize.littleSmall,
  fontFamily: isFocused ? fonts.metropolisSemiBold : fonts.metropolisRegular,
  marginTop: size.moderateScale(5) 
})


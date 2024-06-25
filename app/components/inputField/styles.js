import { color, fontSize, fonts, size } from "../../theme";

export const rootContainer = (error) => ({
  flexDirection: 'row',
  alignItems: 'center',
  borderRadius: size.moderateScale(4),
  backgroundColor: color.white,
  borderWidth: size.moderateScale(1),
  borderColor: error ? color.error : color.white,
  elevation: size.moderateScale(6),
  paddingLeft: size.moderateScale(10)
})

export const inputField = (rightIcon, isFocus) => ({
  flex: 1,
  height: size.moderateScale(65),
  paddingTop:isFocus ? size.moderateScale(25):size.moderateScale(12),
  paddingLeft: size.moderateScale(10),
  paddingRight: rightIcon ? 0 : size.moderateScale(20),
  fontSize: fontSize.small,
  fontFamily: fonts.metropolisMedium,
  color: color.mostlyBlack
})

export const labelText = () => ({
  color: color.darkGray,
  position: 'absolute',
  left: size.moderateScale(20),
  textAlign: 'left',
})

export const errorText = () => ({
  color: color.error,
  fontSize: fontSize.mediumSmall,
  fontFamily: fonts.metropolisRegular,
  textAlign: 'center',
  marginTop: size.moderateScale(-8)
})

export const rightIcon = () => ({
  width: size.deviceWidth * 0.08,
  height: size.deviceHeight * 0.04,
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: size.moderateScale(10)
})
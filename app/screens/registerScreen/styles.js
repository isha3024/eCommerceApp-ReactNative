import { color, fontSize, fonts, size } from "../../theme";

export const mainView = () => ({
  flex: 1,
  backgroundColor: color.primary,
})

export const header = () => ({
  paddingHorizontal: size.moderateScale(16),
})

export const topContainer = () => ({
  paddingLeft: size.moderateScale(15),
  paddingTop: size.moderateScale(18)
})
export const middleContainer = () => ({
  padding: size.moderateScale(15),
  marginTop: size.moderateScale(60),
  gap: size.moderateScale(22)
})

export const inputView = () => ({
  position: 'relative'
})

export const bottomContainer = () => ({
  marginTop: size.moderateScale(100),
  paddingHorizontal: size.moderateScale(10),
  alignItems: 'center',
  justifyContent: 'center',
})

export const textAlignRight = () => ({
  textAlign: 'right',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: size.moderateScale(4),
})

export const iconView = () => ({
  width: size.deviceWidth * 0.06,
  height: size.deviceHeight * 0.02,
  alignItems: 'center',
  justifyContent: 'center'
})

export const text = () => ({
  color: color.mostlyBlack,
  fontSize: fontSize.small,
  fontFamily: fonts.metropolisMedium
})

export const errorText = () => ({
  color: color.error,
  fontSize: fontSize.mediumSmall,
  fontFamily: fonts.metropolisRegular,
  marginTop: size.moderateScale(-10),
  textAlign: 'center',
  position: 'absolute',
  bottom: -15,
  width: '100%'
})

export const noError = () => ({
  position: 'absolute',
  bottom: -13,
  width: '100%'
})

export const buttonWithText = () => ({
  marginTop: size.moderateScale(20)
})

export const buttonContainer = () => ({
  flexDirection: 'row',
  gap: size.moderateScale(16),
  marginTop: size.moderateScale(12),
  paddingBottom: size.moderateScale(12),
})

export const button = () => ({
  backgroundColor: color.white,
  borderRadius: size.moderateScale(20),
  elevation: size.moderateScale(2)
})
export const buttonIcon = () => ({
  marginVertical: size.moderateScale(20),
  marginHorizontal: size.moderateScale(30),
  // borderWidth: 1
})


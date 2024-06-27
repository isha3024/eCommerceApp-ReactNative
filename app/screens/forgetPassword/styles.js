import { color, fontSize, fonts, size } from "../../theme";

export const mainView = () => ({
  flex: 1,
  backgroundColor: color.primary,
})

export const topContainer = () => ({
  paddingLeft: size.moderateScale(15),
  paddingTop: size.moderateScale(18)
})

export const middleContainer = () => ({
  padding: size.moderateScale(15),
  marginTop: size.moderateScale(60),
  gap: size.moderateScale(10)
})

export const inputView = () => ({
  position: 'relative'
})

export const text = () => ({
  color: color.mostlyBlack,
  fontSize: fontSize.small,
  fontFamily: fonts.metropolisMedium,
  marginBottom: size.moderateScale(16)
})

export const errorText = () => ({
  color: color.error,
  fontSize: fontSize.mediumSmall,
  fontFamily: fonts.metropolisRegular,
  marginTop: size.moderateScale(-5),
  textAlign: 'center',
  position: 'absolute',
  bottom: -15,
  width: '100%'
})

export const noError = () => ({
  position: 'absolute',
  bottom: -15,
  width: '100%'
})

export const buttonWithText = () => ({
  marginTop: size.moderateScale(55)
})
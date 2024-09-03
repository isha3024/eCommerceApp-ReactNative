import { color, fonts, fontSize, size } from "../../theme"

export const mainView = () => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color.customBlack(0.4)
})

export const infoWrapper = () => ({
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color.primary,
  padding: size.moderateScale(20),
  borderRadius: size.moderateScale(5),
  elevation: size.moderateScale(10),
  shadowColor: color.error,
})

export const noNetworkText = () => ({
  fontSize: fontSize.middleMedium,
  color: color.error,
  width: size.deviceWidth - 100,
  fontFamily: fonts.metropolisMedium,
  textAlign: 'center'
})
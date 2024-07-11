import { color, fonts, fontSize, size } from "../../theme";

export const mainView = () => ({
  flex: 1,
  backgroundColor: color.primary,
  alignItems: 'center',
  justifyContent: 'center',
})

export const imgBG = () => ({
  width: size.notchPresent() ? size.deviceWidth : '100%',
  height: size.notchPresent() ? size.deviceHeight : '100%',
  // marginLeft: 30
})

export const successContainer = () => ({
  alignItems: 'center',
  gap: size.moderateScale(16),
  paddingTop: size.moderateScale(120),
  width: size.deviceWidth - 100,
  marginHorizontal: 'auto'
})

export const successTitle = () => ({
  fontSize: fontSize.middleLarge,
  fontFamily: fonts.metropolisBold,
  color: color.mostlyBlack,
})

export const successMessage = () => ({
  fontSize: fontSize.littleMedium,
  fontFamily: fonts.metropolisSemiBold,
  color: color.mostlyBlack,
  textAlign: 'center',
  lineHeight: size.moderateScale(20)
})

export const button = () => ({
  width: size.moderateScale(160),
  height: size.moderateScale(36),
  paddingVertical: size.moderateScale(10)
})

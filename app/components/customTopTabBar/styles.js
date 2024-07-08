import { color, fontSize, fonts, size } from "../../theme";


export const customTopTabBar = (orderScreen) => ({
  flexDirection: 'row',
  justifyContent: orderScreen ? 'space-between' : 'flex-start',
  backgroundColor: orderScreen ? color.primary : color.white,
  elevation: orderScreen ? 0 : size.moderateScale(10),
  marginTop: orderScreen ? size.moderateScale(32) : 0,
  marginBottom: orderScreen ? size.moderateScale(18) : 0,
  marginHorizontal: orderScreen ? size.moderateScale(16) : 0,
})

export const labelContainer = (isFocused) => ({
  borderBottomColor: isFocused ? color.secondary : color.transparent,
  borderBottomWidth: size.moderateScale(3),
  width: size.deviceWidth * 0.333,
  paddingVertical: size.moderateScale(15),
})

export const label = (isFocused) => ({
  fontFamily: isFocused ? fonts.metropolisSemiBold : fonts.metropolisRegular,
  color: color.mostlyBlack,
  fontSize: fontSize.littleMedium,
  textAlign: 'center',
})

export const orderScreenLabel = (isFocused) => ({
  backgroundColor: isFocused ? color.mostlyBlack : color.transparent,
  width: size.moderateScale(100),
  paddingVertical: size.moderateScale(8),
  borderRadius: size.moderateScale(25)
})

export const orderScreenText = (isFocused) => ({
  fontFamily: fonts.metropolisMedium,
  color: isFocused ? color.white : color.mostlyBlack,
  fontSize: fontSize.small,
  textAlign: 'center',
})
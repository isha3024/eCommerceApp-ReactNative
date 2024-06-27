import { color, fontSize, fonts, size } from "../../theme";


export const customTopTabBar = () => ({
  flexDirection: 'row',
  backgroundColor: color.white,
  elevation: size.moderateScale(10)
})

export const labelContainer = isFocused => ({
  borderBottomColor: isFocused ? color.secondary : color.transparent,
  borderBottomWidth: size.moderateScale(3),
  width: size.deviceWidth * 0.333,
  paddingVertical: size.moderateScale(15),
})
export const label = isFocused => ({
  fontFamily: isFocused ? fonts.metropolisSemiBold : fonts.metropolisRegular,
  color: color.mostlyBlack,
  fontSize: fontSize.littleMedium,
  textAlign: 'center'
})
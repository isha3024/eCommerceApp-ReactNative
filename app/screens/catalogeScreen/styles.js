import { color, fontSize, fonts, size } from "../../theme";

export const header = () => ({
  backgroundColor: color.white
})

export const title = () => ({
  fontFamily: fonts.metropolisBold,
  fontSize: fontSize.middleLarge,
  color: color.mostlyBlack
})

export const mainView = () => ({
  paddingHorizontal: size.moderateScale(14),
  paddingTop: size.moderateScale(18),
  backgroundColor: color.white
})

export const horizontalScroll = () => ({
  paddingTop: size.moderateScale(12),
  backgroundColor: color.white,
})

export const listItem = () => ({
  backgroundColor: color.mostlyBlack,
  borderRadius: size.moderateScale(20),
  marginLeft: size.moderateScale(10),
  width: size.moderateScale(100),
  height: size.moderateScale(30),
  alignItems: 'center',
  justifyContent: 'center',
})

export const listText = () => ({
  color: color.white,
  fontSize: fontSize.small,
  fonts: fonts.metropolisMedium 
})

export const filterContainer = () => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: color.primary,
  marginTop: size.moderateScale(18),
  paddingVertical: size.moderateScale(6),
  marginHorizontal: size.moderateScale(16),
  marginBottom: size.moderateScale(10),
  elevation: size.moderateScale(5)
})

export const filterItem = () => ({
  flexDirection: 'row',
  gap: size.moderateScale(8)
})

export const filterItemText = () => ({
  fontSize: fontSize.mediumSmall,
  fonts: fonts.metropolisRegular,
  color: color.mostlyBlack
})
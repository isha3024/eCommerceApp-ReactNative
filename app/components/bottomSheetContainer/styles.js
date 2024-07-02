import { StyleSheet } from "react-native"
import { color, fontSize, fonts, size } from "../../theme"

export const overlay = () => ({
  ...StyleSheet.absoluteFillObject,
  // backgroundColor: color.customTransparent(0.8),
  zIndex: 100,
})

export const contentContainer = () => ({
  backgroundColor: color.primary,
})

export const bottomSheet = () => ({
  backgroundColor: color.darkGray,
  overflow:'hidden',
  borderRadius: size.moderateScale(34),
  zIndex: 100,
  elevation: 100
})

export const title = () => ({
  fontSize: fontSize.middleMedium,
  fontFamily: fonts.metropolisSemiBold,
  color: color.mostlyBlack,
  textAlign: 'center',
  marginBottom: size.moderateScale(10)
})

export const handleComponent = () => ({
  alignItems: 'center',
  paddingVertical: size.moderateScale(10),
  marginBottom: size.moderateScale(10),
  borderRadius: 60
})

export const handle = () => ({
  width: size.moderateScale(60),
  height: size.moderateScale(6),
  borderRadius: size.moderateScale(60),
  backgroundColor: color.darkGray
})
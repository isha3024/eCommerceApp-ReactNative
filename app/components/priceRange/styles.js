import { color, fontSize, fonts, size } from "../../theme";

export const rangeContainer = () => ({
  paddingVertical: size.moderateScale(16),
})

export const labelContainer = () => ({
  position: 'absolute',
  width: '100%',
  top: size.moderateScale(-10),
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const label = () => ({
  color: color.mostlyBlack,
  fontSize: fontSize.small,
  fontFamily: fonts.metropolisMedium
})

export const trackBack = () => ({
  width: '100%',
  height: size.moderateScale(3),
  backgroundColor: color.darkGray,
  marginTop: size.moderateScale(13)
})

export const trackFront = () => ({
  width: '100%',
  height: size.moderateScale(3),
  backgroundColor: color.secondary,
  position: 'absolute',
  top: size.moderateScale(13)
})

export const thumb = () => ({
  width: size.moderateScale(22),
  height: size.moderateScale(22),
  borderRadius: size.moderateScale(20),
  backgroundColor: color.secondary,
  position: 'absolute',
  top: size.moderateScale(3)
})


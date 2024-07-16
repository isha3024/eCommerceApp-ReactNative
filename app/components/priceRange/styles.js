import { color, fontSize, fonts, size } from "../../theme";

export const mainView = () => ({
  paddingVertical: size.moderateScale(16),
})

export const slider = () => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
})

export const horizontalContainer = () => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
})

export const valueText = () => ({
  color: color.mostlyBlack,
  fontSize: fontSize.small,
  fontFamily: fonts.metropolisMedium
})

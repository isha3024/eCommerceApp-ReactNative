import { color, fontSize, fonts, size } from "../../theme";

export const sortListItem = () => ({
  flex: 1,
  // width: '100%',
  paddingVertical: size.moderateScale(16),
  paddingHorizontal: size.moderateScale(16),
  backgroundColor: color.white
  // backgroundColor: color.secondary
})

export const sortItemText = () => ({
  color: color.mostlyBlack,
  fontSize: fontSize.littleMedium,
  fontFamily: fonts.metropolisRegular
})

export const selectedItem = () => ({
  backgroundColor: color.secondary
})

export const selectedItemText = () => ({
  color: color.white,
  fontFamily: fonts.metropolisSemiBold
})
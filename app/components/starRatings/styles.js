import { color, fontSize, fonts, size } from "../../theme";

export const starContainer = () => ({
  flexDirection: 'row',
  alignItem: 'flex-end',
  gap: size.moderateScale(2)
})

export const reviews = () => ({
  color: color.darkGray,
  fontSize: fontSize.littleSmall,
  fontFamily: fonts.metropolisRegular,
  marginLeft: size.moderateScale(2)
})
import { color, size } from "../../theme"

export const containerStyle = () => ({
  width: size.moderateScale(33),
  height: size.moderateScale(20),
  backgroundColor: color.darkGray,
  borderRadius: size.moderateScale(20),
  justifyContent: 'center'
})

export const circle = (active) => ({
  width: size.moderateScale(20),
  height: size.moderateScale(20),
  backgroundColor: active ? color.success : color.white,
  borderRadius: size.moderateScale(20),
  elevation: size.moderateScale(4)
})
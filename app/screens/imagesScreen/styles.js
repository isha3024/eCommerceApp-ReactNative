import { color, size } from "../../theme";

export const imageScrollView = () => ({
  flex: 1, 
  backgroundColor: color.mostlyBlack,
  // paddingHorizontal: size.moderateScale(5),
})

export const fullImage = () => ({
  width: size.deviceWidth, 
  height: size.deviceHeight, 
  resizeMode: 'cover',
  // marginHorizontal: size.moderateScale(5)
})
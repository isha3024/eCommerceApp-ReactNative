import { color, size } from "../../theme";

export const mainView = () => ({
  flex: 1,
  backgroundColor: color.primary
})

export const topView = () => ({
  backgroundColor: color.white,
  elevation: size.moderateScale(10),
  marginBottom: size.moderateScale(10),
})

export const header = () => ({
  backgroundColor: color.white,
  paddingHorizontal: size.moderateScale(16)
})
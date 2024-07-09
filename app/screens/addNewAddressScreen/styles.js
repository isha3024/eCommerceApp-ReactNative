import { color, size } from "../../theme";

export const mainView = () => ({
  flex: 1,
  backgroundColor: color.primary
})

export const topView = () => ({
  
})

export const header = () => ({
  paddingHorizontal: size.moderateScale(16),
  elevation: size.moderateScale(6)
})

export const middleView = () => ({
  paddingHorizontal: size.moderateScale(16),
  paddingVertical: size.moderateScale(35),
  gap: size.moderateScale(20)
})

export const backArrow = () => ({
  transform: [{rotate: '180deg'}]
})

export const button = () => ({
  marginTop: size.moderateScale(20)
})
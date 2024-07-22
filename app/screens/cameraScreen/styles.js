import { color, fonts, fontSize, size } from "../../theme";

export const mainView = () => ({
  flex: 1,
  // backgroundColor: color.primary,
})

export const topView = () => ({
  
})

export const header = () => ({
  paddingHorizontal: size.moderateScale(16)
})

export const visualSearchWrapper = () => ({
  
})

export const bgImage = () => ({
  width: '100%',
  height: '100%',
  justifyContent: 'center',
})

export const centeredView = () => ({
  paddingHorizontal: size.moderateScale(16),
})

export const searchText = () => ({
  fontSize: fontSize.medium,
  fontFamily: fonts.metropolisSemiBold,
  marginBottom: size.moderateScale(28)
})

export const buttonBorder = () => ({
  borderColor: color.white,
  marginTop: size.moderateScale(16)
})

export const buttonText = () => ({
  color: color.white
})
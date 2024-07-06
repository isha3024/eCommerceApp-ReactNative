import { color, fontSize, fonts, size } from "../../theme"
import { badgeText } from "../productCardMain/styles"

export const mainContainer = statusBarheight => ({
  flexDirection: 'row',
  marginTop: statusBarheight,
  height: size.moderateScale(50),
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: color.primary,
})
export const headerTitle = () => ({
  fontSize: fontSize.middleMedium,
  color: color.veryDarkGray,
  fontFamily: fonts.metropolisSemiBold
})
export const headerMain = () => ({
  textAlign: 'center'
})
export const leftView = () => ({
  width: size.moderateScale(24),
  height: size.moderateScale(24),
  justifyContent: 'center',
  alignItems: 'flex-start',
})
export const rightView = () => ({
  width: size.moderateScale(24),
  height: size.moderateScale(24),
  justifyContent: 'center',
  alignItems: 'center',
})

export const centerView = () => ({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
})

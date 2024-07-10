import { color, fonts, fontSize, size } from "../../theme"

export const mainView = () => ({
  flex: 1,
  backgroundColor: color.primary
})
export const topView = () => ({
  gap: size.moderateScale(18),
  paddingBottom: size.moderateScale(12),
})

export const header = () => ({
  paddingHorizontal: size.moderateScale(14)
})

export const mainTitle = () => ({
  paddingHorizontal: size.moderateScale(14),
  fontSize: fontSize.middleLarge,
  fontFamily: fonts.metropolisBold,
  color: color.mostlyBlack
})

export const middleView = () => ({
  
})

export const orderedProducts = () => ({
  paddingTop: size.moderateScale(12),
  marginHorizontal: size.moderateScale(16)
})

export const flatList = () => ({
  gap: size.moderateScale(24)
})

export const promoCardWrapper = () => ({
  marginTop: size.moderateScale(25)
})

export const promoCodeInput = () => ({
  backgroundColor: color.white,
  color: color.mostlyBlack,
  fontFamily: fonts.metropolisMedium,
  fontSize: fontSize.small,
  paddingHorizontal: size.moderateScale(20),
  marginHorizontal: size.moderateScale(16),
  borderRadius: size.moderateScale(8),
  height: size.moderateScale(36),
  alignItems: 'center'
})

export const forwardButton = () => ({
  width: size.moderateScale(36),
  height: size.moderateScale(36),
  backgroundColor: color.mostlyBlack,
  borderRadius: size.moderateScale(20),
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  right: size.moderateScale(16)
})
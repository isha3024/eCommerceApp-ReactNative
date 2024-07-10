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
  marginHorizontal: size.moderateScale(16),
})

export const flatList = () => ({})

export const contentContainerStyle = () => ({
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

export const totalAmountView = () => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginVertical: size.moderateScale(28),
  paddingHorizontal: size.moderateScale(16)
})

export const totalAmountText = () => ({
  fontSize: fontSize.small,
  color: color.darkGray,
  fontFamily: fonts.metropolisMedium
})

export const totalAmount = () => ({
  fontSize: fontSize.middleMedium,
  color: color.mostlyBlack,
  fontFamily: fonts.metropolisSemiBold
})

export const button = () => ({
  marginHorizontal: size.moderateScale(16)
})

export const bottomSheetTitle = () => ({
  fontSize: fontSize.middleMedium,
  fontFamily: fonts.metropolisSemiBold,
  color: color.mostlyBlack,
  marginHorizontal: size.moderateScale(16),
  marginTop: size.moderateScale(32) 
})

export const promoCard = () => ({
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: color.white,
  borderRadius: size.moderateScale(8),
  overflow: 'hidden',
  marginHorizontal: size.moderateScale(16),
})

export const promoCardImgView = () => ({
  width: size.moderateScale(81),
  height: size.moderateScale(80),
  borderTopLeftRadius: size.moderateScale(8),
  borderBottomLeftRadius: size.moderateScale(8)
})
export const promoCardImg = () => ({
  width: '100%',
  height: '100%',
})

export const promoCardContent = () => ({
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: size.moderateScale(14),
  paddingVertical: size.moderateScale(6),
})

export const promoCardContentLeft = () => ({
  flex: 0.6,
  gap: size.moderateScale(5)
})

export const promoCardContentRight = () => ({
  alignItems: 'center',
  flex: 0.4,
  gap: size.moderateScale(10)
})

export const promoCardTitle = () => ({
  fontSize: fontSize.small,
  fontFamily: fonts.metropolisMedium,
  color: color.mostlyBlack,
})

export const promoCardCode = () => ({
  fontSize: fontSize.mediumSmall,
  fontFamily: fonts.metropolisRegular,
  color: color.mostlyBlack,
})

export const promoCodeDays = () => ({
  fontSize: fontSize.mediumSmall,
  fontFamily: fonts.metropolisRegular,
  color: color.darkGray,
})

export const applyBtn = () => ({
  width: size.moderateScale(93)
})

export const bottomSheetScroll = () => ({
  marginVertical: size.moderateScale(18)
})

export const cartOptions = () => ({
  backgroundColor: color.white,
  borderRadius: size.moderateScale(8),
  position: 'absolute',
  top: size.moderateScale(-17),
  right: size.moderateScale(33),
  elevation: size.moderateScale(10),
})

export const cartOptionItem = () => ({
  height: size.moderateScale(48),
  width: size.moderateScale(170),
  alignItems: 'center',
  justifyContent: 'center',
})

export const cartOptionItemBorder = () => ({
  borderBottomColor: color.customBlack(0.1),
  borderBottomWidth: size.moderateScale(1),
})

export const cartOptionText = () => ({
  color: color.mostlyBlack,
  fontFamily: fonts.metropolisRegular,
  fontSize: fontSize.mediumSmall
})
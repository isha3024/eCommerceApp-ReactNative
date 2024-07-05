import { color, fontSize, fonts, size } from "../../theme"


export const mainProductCard = (isProductSold) => ({
  backgroundColor: color.primary,
  width: size.deviceWidth * 0.4,
  // marginRight: size.moderateScale(10),
  borderRadius: size.moderateScale(8),
  opacity: isProductSold ? 0.7 : 1
})

export const mainViewHorizontal = (isProductSold) => ({
  marginVertical: size.moderateScale(16), 
  marginHorizontal: size.moderateScale(10),
  elevation: size.moderateScale(5),
  opacity: isProductSold ? 0.7 : 1,
  backgroundColor: color.primary,
  borderRadius: size.moderateScale(8),

})
export const mainProductCardHorizontal = () => ({
  backgroundColor: color.white,
  flexDirection: 'row',
  backgroundColor: color.white,
  borderRadius: size.moderateScale(8),
})

export const imageView = () => ({
  width: '100%',
  height: size.moderateScale(184),
})

export const imageViewHorizontal = () => ({
  width: size.moderateScale(104),
  height: '100%',
  overflow: 'hidden',
})

export const image = () => ({
  flex: 1,
  height: '100%',
  width: '100%',
  borderRadius: size.moderateScale(8),
})

export const imageHorizontal = () => ({
  flex: 1,
  height: '100%',
  width: '100%',
  borderTopLeftRadius: size.moderateScale(8),
  borderBottomLeftRadius: size.moderateScale(8),
})

export const addToFavoriteBtn = () => ({
  position: 'absolute',
  width: size.moderateScale(36),
  height: size.moderateScale(36),
  backgroundColor: color.white,
  borderRadius: size.moderateScale(40),
  alignItems: 'center',
  justifyContent: 'center',
  right: size.moderateScale(16),
  top: size.moderateScale(163),
  zIndex: size.moderateScale(10),
  elevation: size.moderateScale(4)
})

export const addToFavoriteBtnHorizontal = () => ({
  position: 'absolute',
  width: size.moderateScale(36),
  height: size.moderateScale(36),
  backgroundColor: color.white,
  borderRadius: size.moderateScale(40),
  alignItems: 'center',
  justifyContent: 'center',
  bottom: size.moderateScale(-5),
  right: size.moderateScale(10),
  zIndex: size.moderateScale(10),
  elevation: size.moderateScale(4)
})

export const addToCartBtnHorizontal = () => ({
  position: 'absolute',
  width: size.moderateScale(36),
  height: size.moderateScale(36),
  backgroundColor: color.secondary,
  borderRadius: size.moderateScale(40),
  alignItems: 'center',
  justifyContent: 'center',
  bottom: size.moderateScale(-17),
  right: size.moderateScale(0),
  zIndex: size.moderateScale(10),
  elevation: size.moderateScale(4)
})

export const addToCartBtn = () => ({
  position: 'absolute',
  width: size.moderateScale(36),
  height: size.moderateScale(36),
  backgroundColor: color.secondary,
  borderRadius: size.moderateScale(40),
  alignItems: 'center',
  justifyContent: 'center',
  bottom: size.moderateScale(-18),
  right: size.moderateScale(0),
  zIndex: size.moderateScale(10),
  elevation: size.moderateScale(4)
})

export const badge = (newProduct) => ({
  position: 'absolute',
  width: size.moderateScale(40),
  height: size.moderateScale(24),
  backgroundColor: newProduct ? color.mostlyBlack : color.transparent,
  borderRadius: size.moderateScale(29),
  alignItems: 'center',
  justifyContent: 'center',
  top: size.moderateScale(8),
  left: size.moderateScale(8),
})

export const badgeHorizontal = () => ({
  position: 'absolute',
  width: size.moderateScale(40),
  height: size.moderateScale(24),
  // backgroundColor: newProduct ? color.mostlyBlack : color.transparent,
  borderRadius: size.moderateScale(29),
  alignItems: 'center',
  justifyContent: 'center',
  top: size.moderateScale(8),
  left: size.moderateScale(8),
})

export const discountBadge = () => ({
  backgroundColor: color.secondary,
})

export const badgeText = () => ({
  fontSize: fontSize.mediumSmall,
  fontFamily: fonts.metropolisSemiBold,
  color: color.white
})

export const productInfo = () => ({
  gap: size.moderateScale(5),
  paddingTop: size.moderateScale(7),
})

export const productInfoHorizontal = () => ({
  paddingLeft: size.moderateScale(10),
  paddingVertical: size.moderateScale(15),
  backgroundColor: color.white,
  gap: size.moderateScale(4),
  zIndex: size.moderateScale(5),
  flex: 1,
  borderTopRightRadius: size.moderateScale(8),
  borderBottomRightRadius: size.moderateScale(8),
})

export const starRatings = () => ({
  marginVertical: size.moderateScale(8)
})

export const ratingsContainer = () => ({
  flexDirection: 'row',
  
})

export const brandName = () => ({
  fontSize: fontSize.mediumSmall,
  color: color.darkGray,
  fontFamily: fonts.metropolisRegular,
})

export const colorAndSizeWrapper = () => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: size.moderateScale(15),
  marginVertical: size.moderateScale(6)
})

export const colorAndSizeWrapperVertical = () => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: size.moderateScale(15),
  marginVertical: size.moderateScale(0)
})

export const colorAndSize = () => ({
  flexDirection: 'row',
  alignItems: 'center',
})

export const lightText = () => ({
  fontSize: fontSize.mediumSmall,
  color: color.darkGray,
  fontFamily: fonts.metropolisRegular,
})

export const darkText = () => ({
  fontSize: fontSize.mediumSmall,
  color: color.mostlyBlack,
  fontFamily: fonts.metropolisRegular,
})

export const productTitle = () => ({
  fontSize: fontSize.littleMedium,
  color: color.mostlyBlack,
  fontFamily: fonts.metropolisSemiBold
})

export const priceContainer = () => ({
  flexDirection: 'row',
  gap: size.moderateScale(5),
})

export const oldPrice = () => ({
  fontSize: fontSize.small,
  color: color.darkGray,
  fontFamily: fonts.metropolisMedium,
  textDecorationLine: 'line-through'
})

export const newPrice = () => ({
  fontSize: fontSize.small,
  color: color.secondary,
  fontFamily: fonts.metropolisMedium
})

export const regularPrice = () => ({
  fontSize: fontSize.small,
  color: color.mostlyBlack,
  fontFamily: fonts.metropolisMedium
})

export const closeIcon = () => ({
  position: 'absolute',
  width: size.moderateScale(25),
  height: size.moderateScale(25),
  borderTopRightRadius: size.moderateScale(8),
  alignItems: 'center',
  justifyContent: 'center',
  top: size.moderateScale(8),
  right: size.moderateScale(8),
})

export const closeIconHorizontal = () => ({
  position: 'absolute',
  width: size.moderateScale(25),
  height: size.moderateScale(25),
  borderTopRightRadius: size.moderateScale(8),
  alignItems: 'center',
  justifyContent: 'center',
  top: size.moderateScale(5),
  right: size.moderateScale(5),
})

export const ratingsAndPriceWrapper = () => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingRight: size.moderateScale(50)
})

export const productSoldText = () => ({
  marginHorizontal: size.moderateScale(10),
  marginTop: size.moderateScale(0),
  fontSize: fontSize.mediumSmall,
  color: color.mostlyBlack,
  fontFamily: fonts.metropolisRegular,
  position: 'absolute',
  bottom: size.moderateScale(-12)
})

export const productSoldTextVertical = () => ({
  paddingHorizontal: size.moderateScale(10),
  paddingVertical: size.moderateScale(10),
  backgroundColor: color.customWhite(0.6),
  borderBottomLeftRadius: size.moderateScale(8),
  borderBottomRightRadius: size.moderateScale(8),
  width: '100%',
  fontSize: fontSize.mediumSmall,
  color: color.mostlyBlack,
  fontFamily: fonts.metropolisRegular,
  position: 'absolute',
  bottom: size.moderateScale(0)
})
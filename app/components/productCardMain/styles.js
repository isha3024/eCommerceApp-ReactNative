import { color, fontSize, fonts, size } from "../../theme"


export const mainProductCard = () => ({
  backgroundColor: color.primary,
  width: size.deviceWidth * 0.4,
  marginHorizontal: size.moderateScale(10),
  borderRadius: size.moderateScale(8)
})

export const mainProductCardHorizontal = () => ({
  backgroundColor: color.white,
  flexDirection: 'row',
  backgroundColor: color.white,
  elevation: size.moderateScale(5),
  borderRadius: size.moderateScale(8),
  marginVertical: size.moderateScale(10), 
  marginHorizontal: size.moderateScale(10) 
})

export const imageView = () => ({
  width: size.deviceWidth * 0.4,
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
  right: size.moderateScale(0),
  bottom: size.moderateScale(-15),
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
  right: size.moderateScale(0),
  bottom: size.moderateScale(-15),
  zIndex: size.moderateScale(10),
  elevation: size.moderateScale(4)
})

export const badge = (sale, newProduct) => ({
  position: 'absolute',
  width: size.moderateScale(40),
  height: size.moderateScale(24),
  backgroundColor: sale ? color.secondary : newProduct ? color.mostlyBlack : color.transparent,
  borderRadius: size.moderateScale(40),
  alignItems: 'center',
  justifyContent: 'center',
  top: size.moderateScale(8),
  left: size.moderateScale(8),
})

export const badgeHorizontal = (sale, newProduct) => ({
  position: 'absolute',
  width: size.moderateScale(40),
  height: size.moderateScale(24),
  backgroundColor: sale ? color.secondary : newProduct ? color.mostlyBlack : color.transparent,
  borderRadius: size.moderateScale(29),
  alignItems: 'center',
  justifyContent: 'center',
  top: size.moderateScale(8),
  left: size.moderateScale(8),
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
  borderTopRightRadius: size.moderateScale(8)
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

export const closeIcon = (sale, newProduct) => ({
  position: 'absolute',
  width: size.moderateScale(25),
  height: size.moderateScale(25),
  borderTopRightRadius: size.moderateScale(8),
  alignItems: 'center',
  justifyContent: 'center',
  top: size.moderateScale(8),
  right: size.moderateScale(8),
})
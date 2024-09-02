import { color, fontSize, fonts, size } from "../../theme";

export const topView = () => ({ 
})

export const bottomView = () => ({ 
  width: '100%',
  position: 'absolute',
  bottom: 0,
  backgroundColor: color.white,
  paddingVertical: size.moderateScale(20),
  paddingHorizontal: size.moderateScale(16),
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 12,
  },
  shadowOpacity: 0.58,
  shadowRadius: 16.00,

  elevation: size.moderateScale(12),
})

export const header = () => ({
  backgroundColor: color.white,
  paddingHorizontal: size.moderateScale(16)  
})

export const mainProduct = () => ({
  backgroundColor: color.primary  
})

export const scrollImageView = () => ({
  gap: size.moderateScale(10),
  backgroundColor: color.white
})

export const mainProductImage = () => ({
  width: size.deviceWidth,
  height: size.deviceHeight - 400,
  marginRight: size.moderateScale(10),
})

export const productOptions = () => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingVertical: size.moderateScale(12),
  paddingHorizontal: size.moderateScale(18),
})

export const productDropdown = (userSizeOption) => ({
  height: size.moderateScale(40),
  width: size.moderateScale(126),
  paddingHorizontal: size.moderateScale(12),
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderColor: userSizeOption ? color.secondary : color.darkGray,
  borderWidth: size.moderateScale(0.5),
  borderRadius: size.moderateScale(8),
})

export const dropDownArrow = () => ({
  transform: [{rotate: '-90deg'}]
})
export const colorDropdown = () => ({
  gap: size.moderateScale(4)
})

export const addToFavorite = () => ({
  width: size.moderateScale(36),
  height: size.moderateScale(36),
  backgroundColor: color.white,
  borderRadius: size.moderateScale(40),
  alignItems: 'center',
  justifyContent: 'center',
  elevation: size.moderateScale(4)
})

export const productOptionText = () => ({
  color: color.mostlyBlack,
  fontFamily: fonts.metropolisMedium,
  fontSize: fontSize.small
})

export const productInfo = () => ({
  paddingHorizontal: size.moderateScale(16),
  paddingVertical: size.moderateScale(22),
})

export const productBrandPrice = () => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const productBrand = () => ({
  color: color.mostlyBlack,
  fontFamily: fonts.metropolisSemiBold,
  fontSize: fontSize.medium
})

export const productPrice = () => ({
  color: color.mostlyBlack,
  fontFamily: fonts.metropolisSemiBold,
  fontSize: fontSize.medium
})

export const productTitle = () => ({
  color: color.darkGray,
  fontFamily: fonts.metropolisRegular,
  fontSize: fontSize.mediumSmall,
  marginTop: size.moderateScale(5)
})

export const productDescription = () => ({
  color: color.mostlyBlack,
  fontFamily: fonts.metropolisRegular,
  fontSize: fontSize.small,
  marginTop: size.moderateScale(16),
  letterSpacing: size.moderateScale(0.15),
  lineHeight: size.moderateScale(20),
})

export const starRatings = () => ({
  marginTop: size.moderateScale(10)
})

export const productDetails = () => ({
  borderTopWidth: size.moderateScale(0.4),
  borderColor: color.darkGray,
  paddingHorizontal: size.moderateScale(16),
  paddingVertical: size.moderateScale(16),
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',  
})

export const productDetailsLastItem = () => ({
  borderBottomWidth: size.moderateScale(0.4),
  borderBottomColor: color.darkGray,
})

export const productDetailText = () => ({
  fontSize: fontSize.littleMedium,
  color: color.mostlyBlack,
  fontFamily: fonts.metropolisRegular
})

export const forwardArrow = () => ({
  transform: [{rotate: '180deg'}],
})

export const relatedProducts = () => ({
  paddingVertical: size.moderateScale(28),
  paddingLeft: size.moderateScale(16),
})

export const relatedProductsHeading = () => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',  
  paddingRight: size.moderateScale(16),
  marginBottom: size.moderateScale(12)
})
export const relatedProductsTitle = () => ({
  fontSize: fontSize.middleMedium,
  color: color.mostlyBlack,
  fontFamily: fonts.metropolisSemiBold
})

export const relatedProductsItems = () => ({
  fontSize: fontSize.mediumSmall,
  color: color.darkGray,
  fontFamily: fonts.metropolisRegular
})

export const flotingBtnStyle = () => ({
  // top: '50%'
})

export const productCardHome = () => ({
  marginRight: size.moderateScale(16)
});

export const titleBottomSheet = () => ({
  fontSize: fontSize.middleMedium,
  fontFamily: fonts.metropolisSemiBold,
  color: color.mostlyBlack,
  textAlign: 'center',
  marginBottom: size.moderateScale(10),
})

export const sizeContainer = () => ({
  marginHorizontal: size.moderateScale(16),
  flexDirection: 'row',
  flexWrap: 'wrap',
  columnGap: size.moderateScale(10),
  rowGap: size.moderateScale(10),
  marginTop: size.moderateScale(22)
})

export const sizeItem = (isSelected) => ({
  width: '30%',
  height: size.moderateScale(40),
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: isSelected ? color.secondary : color.white,
  borderColor: isSelected ? color.secondary : color.darkGray,
  borderWidth: size.moderateScale(1),
  borderRadius: size.moderateScale(8)
})

export const sizeText = (isSelected) => ({
  color: isSelected ? color.white :color.mostlyBlack,
  fontSize: fontSize.small,
  fontFamily: fonts.metropolisMedium
})

export const sizeInfo = () => ({
  marginTop: size.moderateScale(22),
  borderTopWidth: size.moderateScale(0.5),
  borderBottomWidth: size.moderateScale(0.5),
  borderTopColor: color.darkGray,
  borderBottomColor: color.darkGray,
  padding: size.moderateScale(16),
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between'
})

export const sizeInfoText = () => ({
  fontSize: fontSize.littleMedium,
  fontFamily: fonts.metropolisRegular,
  color: color.mostlyBlack
})

export const button = () => ({
  marginVertical: size.moderateScale(28),
  marginHorizontal: size.moderateScale(16)
})

export const colorItem = () => ({
  width: size.moderateScale(44),
  height: size.moderateScale(44),
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: size.moderateScale(50),
  borderWidth: size.moderateScale(1),
  borderColor: color.darkGray
})

export const colorItemActive = () => ({
  borderColor: color.secondary
})

export const colors = (colorBg) => ({
  position: 'absolute',
  backgroundColor: colorBg ? colorBg : color.white,
  width: '85%',
  height: '85%',
  borderRadius: size.moderateScale(50)
})
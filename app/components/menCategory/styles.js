import { color, fontSize, fonts, size } from "../../theme";

export const categoriesSection = () => ({
  paddingTop: size.moderateScale(15),
  backgroundColor: color.primary,
  paddingHorizontal: size.moderateScale(16),
  paddingBottom: size.moderateScale(100)
})

export const summerSale = () => ({
  // marginHorizontal: size.moderateScale(16),
  height: size.moderateScale(100),
  backgroundColor: color.secondary,
  borderRadius: size.moderateScale(8),
  alignItems: 'center',
  justifyContent: 'center',
  gap: size.moderateScale(5),
  marginBottom: size.moderateScale(16)
})

export const title = () => ({
  color: color.white,
  fontSize: fontSize.medium,
  fontFamily: fonts.metropolisSemiBold
})

export const text = () => ({
  color: color.white,
  fontSize: fontSize.small,
  fontFamily: fonts.metropolisMedium
})

export const selectedCategoriesList = () => ({
  marginTop: 0, 
})

export const flatList = () => ({
  flexGrow: 1, 
  marginBottom: size.moderateScale(100), 
})

export const categoryItem = () => ({
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: size.moderateScale(16),
  height: size.moderateScale(100),
  borderRadius: size.moderateScale(8),
  backgroundColor: color.white,
  // elevation: size.moderateScale(5),
  zIndex: 5
})

export const categoryItemNameView = () => ({
  flex: 0.5,
})

export const categoryItemName = () => ({
  color: color.mostlyBlack,
  fontSize: fontSize.middleMedium,
  fontFamily: fonts.metropolisSemiBold,
  paddingLeft: size.moderateScale(20)
})

export const categoryItemImg = () => ({
  position: 'absolute',
  right: 0,
  flex: 0.5,
  height: '100%',
  width: '50%',
})
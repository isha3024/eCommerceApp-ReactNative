import { color, fontSize, fonts, size } from "../../theme";

export const header = () => ({
  backgroundColor: color.error,
  paddingHorizontal: size.moderateScale(16),
  zIndex: 0
})

export const categoriesTab = () => ({
  flexDirection: 'row',
  marginTop: size.moderateScale(10),
  backgroundColor: color.white
})

export const categoryView = (active) => ({
  width: size.deviceWidth * 0.333,
  paddingVertical: size.moderateScale(15),
  borderBottomColor: active ? color.secondary : color.transparent,
  borderBottomWidth: size.moderateScale(4)
})

export const categoryText = () => ({
  color: color.mostlyBlack,
  fontSize: fontSize.littleMedium,
  fontFamily: fonts.metropolisSemiBold,
  textTransform: 'capitalize',
  textAlign: 'center',
})
export const categoriesSection = () => ({
  paddingVertical: size.moderateScale(15),
  backgroundColor: color.primary,
})

export const summerSale = () => ({
  marginHorizontal: size.moderateScale(16),  
  width: size.moderateScale(343),
  height: size.moderateScale(100),
  backgroundColor: color.secondary,
  borderRadius: size.moderateScale(8),
  alignItems: 'center',
  justifyContent: 'center',
  gap: size.moderateScale(5)
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
  paddingBottom: size.moderateScale(100), 
})

export const categoryItem = () => ({
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: size.moderateScale(16),
  height: size.moderateScale(100),
  borderRadius: size.moderateScale(8),
  backgroundColor: color.white,
  elevation: size.moderateScale(5),
  marginHorizontal: size.moderateScale(16)
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
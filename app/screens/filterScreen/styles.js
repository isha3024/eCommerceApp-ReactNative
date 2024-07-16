import { color, fontSize, fonts, size } from "../../theme";

export const header = () => ({
  backgroundColor: color.white,
  elevation: size.moderateScale(10),
  paddingHorizontal: size.moderateScale(14),
  zIndex: size.moderateScale(1)
})

export const mainScrollView = () => ({
  paddingBottom: size.moderateScale(100)
})
export const mainView = () => ({
  
})

export const filterItem = () => ({
  
})

export const filterItemText = () => ({
  color: color.mostlyBlack,
  fontSize: fontSize.littleMedium,
  fontFamily: fonts.metropolisSemiBold,
  paddingVertical: size.moderateScale(14),
  paddingHorizontal: size.moderateScale(14)
})

export const innerFilterItem = () => ({
  backgroundColor: color.white,
  paddingVertical: size.moderateScale(20),
  paddingHorizontal: size.moderateScale(16),
  flexDirection: 'row',
  alignItem: 'center',
  flexWrap: 'wrap',
  gap: size.moderateScale(15),
  elevation: size.moderateScale(2),
})

export const categoryFilterItem = () => ({
  backgroundColor: color.white,
  paddingVertical: size.moderateScale(24),
  paddingHorizontal: size.moderateScale(16),
  flexDirection: 'row',
  alignItem: 'center',
  flexWrap: 'wrap',
  gap: size.moderateScale(15),
  elevation: size.moderateScale(2)
})

export const colorItem = () => ({
  width: size.moderateScale(40),
  height: size.moderateScale(40),
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: size.moderateScale(50),
  borderWidth: size.moderateScale(1),
  borderColor: color.transparent
})

export const colorItemActive = () => ({
  borderColor: color.secondary
})

export const colors = (colorBg) => ({
  position: 'absolute',
  backgroundColor: colorBg ? colorBg : color.white,
  width: '90%',
  height: '90%',
  borderRadius: size.moderateScale(50)
})

export const sizeItem = () => ({
  width: size.moderateScale(40),
  height: size.moderateScale(40),
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color.white,
  borderRadius: size.moderateScale(8),
  borderWidth: size.moderateScale(1),
  borderColor: color.darkGray
})
export const sizeItemActive = () => ({
  backgroundColor: color.secondary,
  borderColor: color.secondary
})

export const sizes = () => ({
  position: 'absolute',
  color: color.mostlyBlack,
  fontSize: fontSize.small,
  fontFamily: fonts.metropolisMedium
})

export const activeSizes = () => ({
  position: 'absolute',
  color: color.white,
  fontSize: fontSize.small,
  fontFamily: fonts.metropolisMedium
})

export const categoryItem = () => ({
  width: '30%',
  height: size.moderateScale(40),
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color.white,
  borderColor: color.darkGray,
  borderWidth: size.moderateScale(1),
  borderRadius: size.moderateScale(8)
})

export const categoryItemActive = () => ({
  backgroundColor: color.secondary,
  borderColor: color.secondary,
})

export const categoryText = () => ({
  color: color.mostlyBlack,
  fontSize: fontSize.small,
  fontFamily: fonts.metropolisMedium
})

export const categoryTextActive = () => ({
  color: color.white,
})


export const brandContainer = () => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingVertical: size.moderateScale(14),
  paddingHorizontal: size.moderateScale(16),
})

export const text = () => ({
  color: color.mostlyBlack,
  fontSize: fontSize.littleMedium,
  fontFamily: fonts.metropolisMedium
})

export const forwardArrow = () => ({
  transform: [{rotate: '180deg'}],
})

export const bottomView = () => ({
  position: 'absolute',
  bottom: 0,
  width: '100%',
  backgroundColor: color.white,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  paddingVertical: size.moderateScale(20),
})

export const button = () => ({
  width: size.moderateScale(165),
  // height: size.moderateScale(36),
  paddingVertical: size.moderateScale(13),
  shadowColor: color.secondary
})

export const sliderContainer = () => ({
  backgroundColor: color.white,
  width: '100%',
})

export const slider = () => ({
  width: '100%',
  height: size.moderateScale(20)
})

export const brandText = () => ({
  color: color.darkGray,
  fontSize: fontSize.mediumSmall,
  fontFamily: fonts.metropolisRegular,
  paddingHorizontal: size.moderateScale(16)
})
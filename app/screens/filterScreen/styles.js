import { color, fontSize, fonts, size } from "../../theme";

export const header = () => ({
  backgroundColor: color.white,
  elevation: size.moderateScale(7),
  paddingHorizontal: size.moderateScale(14)
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
  elevation: size.moderateScale(4)
})

export const colorItem = (active) => ({
  width: size.moderateScale(44),
  height: size.moderateScale(44),
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: size.moderateScale(50),
  borderWidth: size.moderateScale(2),
  borderColor: active ? color.secondary : color.transparent
})

export const colors = (colorBg) => ({
  position: 'absolute',
  backgroundColor: colorBg ? colorBg : color.white,
  width: '80%',
  height: '80%',
  borderRadius: size.moderateScale(50)
})

export const sizeItem = (active) => ({
  width: size.moderateScale(40),
  height: size.moderateScale(40),
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: active ? color.secondary : color.white,
  borderRadius: size.moderateScale(8),
  borderWidth: size.moderateScale(1),
  borderColor: active ? color.secondary : color.darkGray
})

export const sizes = (active) => ({
  position: 'absolute',
  color: active ? color.white : color.mostlyBlack,
  fontSize: fontSize.small,
  fontFamily: fonts.metropolisMedium
})

export const categoryItem = (active) => ({
  width: size.moderateScale(100),
  height: size.moderateScale(40),
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: active ? color.secondary : color.white,
  borderColor: active ? color.transparent : color.darkGray,
  borderWidth: size.moderateScale(1),
  borderRadius: size.moderateScale(8)
})

export const categoryText = (active) => ({
  color: active ? color.white : color.mostlyBlack,
  fontSize: fontSize.small,
  fontFamily: fonts.metropolisMedium
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
  bottom: 40,
  zIndex: 10,
  width: '100%',
  backgroundColor: color.white,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  paddingTop: size.moderateScale(20)
})

export const sliderContainer = () => ({
  backgroundColor: color.white,
  width: '100%',
  marginVertical: size.moderateScale(16)
})

export const slider = () => ({
  width: '100%',
  height: size.moderateScale(20)
})
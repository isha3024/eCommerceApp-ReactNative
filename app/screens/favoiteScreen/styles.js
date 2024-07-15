import { color, fontSize, fonts, size } from "../../theme";

export const topContainer = () => ({
  backgroundColor: color.white,  
  elevation: size.moderateScale(5)
})

export const header = (title) => ({
  paddingHorizontal: size.moderateScale(16),
  backgroundColor: color.white,
  zIndex: title ? 1 : size.moderateScale(2),
  elevation: title ? size.moderateScale(3) : 0
})

export const title = () => ({
  fontFamily: fonts.metropolisBold,
  fontSize: fontSize.middleLarge,
  color: color.mostlyBlack
})

export const mainView = (title) => ({
  paddingHorizontal: size.moderateScale(14),
  paddingTop: title ? size.moderateScale(18) : size.moderateScale(8),
  backgroundColor: color.white
})

export const horizontalScroll = (title) => ({
  paddingTop: title ? size.moderateScale(0) : size.moderateScale(12),
  backgroundColor: color.white,
})

export const flatList = () => ({
  paddingLeft: size.moderateScale(16),
})

export const listItem = () => ({
  backgroundColor: color.mostlyBlack,
  borderRadius: size.moderateScale(20),
  marginRight: size.moderateScale(10), 
  width: size.moderateScale(100),
  height: size.moderateScale(30),
  alignItems: 'center',
  justifyContent: 'center',
})

export const listText = () => ({
  color: color.white,
  fontSize: fontSize.small,
  fonts: fonts.metropolisMedium 
})

export const filterContainer = () => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: color.primary,
  marginTop: size.moderateScale(18),
  marginHorizontal: size.moderateScale(16),
  marginBottom: size.moderateScale(10),
})

export const filterItem = () => ({
  flexDirection: 'row',
  gap: size.moderateScale(8)
})

export const filterIcon = () => ({
  height: size.moderateScale(24),
  width: size.moderateScale(24),
  justifyContent: 'center',
  alignItems: 'flex-end'
})

export const filterItemText = () => ({
  fontSize: fontSize.mediumSmall,
  fonts: fonts.metropolisRegular,
  color: color.mostlyBlack
})

export const bottomContainer = (showGrid) => ({
  flex: 1,
  paddingTop: size.moderateScale(16),
  marginHorizontal: showGrid ?  size.moderateScale(0) : size.moderateScale(10)
})

export const productCardGridItem = () => ({
  width: size.moderateScale(164),
  marginHorizontal: size.moderateScale(8),
  marginBottom: size.moderateScale(26)
})

export const productCardListItem = () => ({
  marginBottom: size.moderateScale(26),
  marginHorizontal: size.moderateScale(16),
})

export const flotingButton = () => ({
  right: size.moderateScale(-1),
  bottom: size.moderateScale(-15),
})

export const flotingButtonList = () => ({
  right: size.moderateScale(16),
  bottom: size.moderateScale(16),
})

export const closeIconList = () => ({
  top: 0,
  right: size.moderateScale(18),
})

export const titleBottomSheet = () => ({
  fontSize: fontSize.middleMedium,
  fontFamily: fonts.metropolisSemiBold,
  color: color.mostlyBlack,
  textAlign: 'center',
  marginBottom: size.moderateScale(10),
})

export const bottomSheetStyle = () => ({
  backgroundColor: color.primary
})

export const sortListItem = (isSelected) => ({
  flex: 1,
  paddingVertical: size.moderateScale(16),
  paddingHorizontal: size.moderateScale(16),
  backgroundColor: isSelected ? color.secondary : color.primary
})

export const sortItemText = (isSelected) => ({
  color: isSelected ? color.white : color.mostlyBlack,
  fontSize: fontSize.littleMedium,
  fontFamily: isSelected ? fonts.metropolisSemiBold : fonts.metropolisRegular
})

export const sizeItem = () => ({
  width: size.moderateScale(100),
  height: size.moderateScale(40),
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color.white,
  borderColor: color.darkGray,
  borderWidth: size.moderateScale(1),
  borderRadius: size.moderateScale(8)
})

export const sizeItemActive = () => ({
  backgroundColor: color.secondary,
  borderColor: color.secondary,
})

export const sizeText = () => ({
  color: color.mostlyBlack,
  fontSize: fontSize.small,
  fontFamily: fonts.metropolisMedium
})

export const sizeTextActive = () => ({
  color: color.white,
})

export const sizeContainer = () => ({
  marginHorizontal: size.moderateScale(16),
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: size.moderateScale(22),
  marginTop: size.moderateScale(22)
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

export const forwardArrow = () => ({
  transform: [{rotate: '180deg'}],
})

export const button = () => ({
  marginTop: size.moderateScale(28),
  marginHorizontal: size.moderateScale(16)
})



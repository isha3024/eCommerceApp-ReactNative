import { color, fontSize, fonts, size } from "../../theme";

export const topContainer = () => ({
  backgroundColor: color.white,  
  elevation: size.moderateScale(5)
})

export const header = (title) => ({
  paddingLeft: size.moderateScale(16),
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
export const bottomContainer = () => ({
  flex: 1,
  paddingTop: size.moderateScale(16),
  paddingHorizontal: size.moderateScale(8),
  // backgroundColor: color.darkGray
})

export const productCardGridItem = () => ({
  width: size.moderateScale(164),
  marginHorizontal: size.moderateScale(8),
  marginBottom: size.moderateScale(26)
})

// export const productCardGridItem = () => ({
//   width: size.moderateScale(164),
//   marginHorizontal: size.moderateScale(8),
//   marginBottom: size.moderateScale(26)
// })

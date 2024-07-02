import { color, fontSize, fonts, size } from "../../theme"

export const header = () => ({
  backgroundColor: color.white,
  elevation: size.moderateScale(8),
  paddingHorizontal: size.moderateScale(14)
})

export const searchBarContainer = () => ({
  marginTop: size.moderateScale(20),
  marginHorizontal: size.moderateScale(16),
  paddingHorizontal: size.moderateScale(15),
  height: size.moderateScale(45),
  borderRadius: size.moderateScale(23),
  backgroundColor: color.white,
  alignItems: 'center',
  flexDirection: 'row',
  gap: size.moderateScale(12),
  elevation: size.moderateScale(4),
})

export const textInputField = () => ({
  fontSize: fontSize.littleMedium,
  fontFamily: fonts.metropolisRegular,
  color: color.darkGray,
  flex: 1,
})

export const brandContainer = () => ({
  marginTop: size.moderateScale(24),
  paddingHorizontal: size.moderateScale(16)
})
export const brandList = () => ({
  marginBottom: size.moderateScale(32),
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
})
export const brandName = () => ({
  fontSize: fontSize.littleMedium,
  fontFamily: fonts.metropolisRegular,
  color: color.mostlyBlack,
})
export const selectedBrandName = () => ({
  color: color.secondary,
  fontFamily: fonts.metropolisSemiBold,
})

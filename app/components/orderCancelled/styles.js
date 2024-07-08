import { color, fonts, fontSize, size } from "../../theme";


export const orderInfo = () => ({
  flex: 1,
  backgroundColor: color.primary
});

export const orderedItem = () => ({
  padding: size.moderateScale(20),
  backgroundColor: color.white,
  borderRadius: size.moderateScale(8),
  elevation: size.moderateScale(7),
  marginVertical: size.moderateScale(12),
  marginHorizontal: size.moderateScale(16),
  zIndex: 1
});

export const horizontal = () => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: size.moderateScale(15)
});

export const horizontalCenter = () => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const quantityTotalAmount = () => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: size.moderateScale(10),
  marginVertical: size.moderateScale(14)
});

export const orderNumText = () => ({
  color: color.mostlyBlack,
  fontFamily: fonts.metropolisSemiBold,
  fontSize: fontSize.littleMedium
});

export const flexRow = () => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: size.moderateScale(10)
});

export const lightText = () => ({
  color: color.darkGray,
  fontFamily: fonts.metropolisRegular,
  fontSize: fontSize.small
});

export const darkText = () => ({
  color: color.mostlyBlack,
  fontFamily: fonts.metropolisMedium,
  fontSize: fontSize.small
});

export const darkBoldText = () => ({
  color: color.mostlyBlack,
  fontFamily: fonts.metropolisSemiBold,
  fontSize: fontSize.small
});

export const quantityPriceText = () => ({
  color: color.mostlyBlack,
  fontFamily: fonts.metropolisSemiBold,
  fontSize: fontSize.littleMedium
});

export const quantityAmout = () => ({
  color: color.mostlyBlack,
  fontFamily: fonts.metropolisRegular,
  fontSize: fontSize.small
});

export const button = () => ({
  width: size.moderateScale(100),
  paddingVertical: size.moderateScale(12),
});

export const cancelText = () => ({
  color: color.error,
  fontFamily: fonts.metropolisMedium,
  fontSize: fontSize.small
});

export const flatListOrder = () => ({
  paddingBottom: size.moderateScale(70)
});
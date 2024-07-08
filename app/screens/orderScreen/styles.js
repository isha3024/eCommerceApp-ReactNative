import { color, fonts, fontSize, size } from "../../theme";

export const mainView = () => ({
  flex: 1,
  backgroundColor: color.primary
});

export const mainTitle = () => ({
  fontSize: fontSize.middleLarge,
  fontFamily: fonts.metropolisBold,
  color: color.mostlyBlack,
  marginTop: size.moderateScale(30),
});

export const topView = () => ({
  paddingHorizontal: size.moderateScale(14)
});

export const middleView = () => ({
  marginVertical: size.moderateScale(24)
});

export const orderDetails = () => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: size.moderateScale(16), 
});

export const orderDetailItem = () => ({
  alignItems: 'center',
  justifyContent: 'center',
  width: size.moderateScale(100),
  height: size.moderateScale(30),
  backgroundColor: color.transparent,
  borderRadius: size.moderateScale(20)
});

export const orderDetailItemActive = () => ({
  backgroundColor: color.mostlyBlack,
});

export const orderDetailItemText = () => ({
  fontSize: fontSize.small,
  fontFamily: fonts.metropolisMedium,
  color: color.mostlyBlack,
});

export const orderDetailItemTextActive = () => ({
  color: color.white,
});

export const orderInfo = () => ({
  marginVertical: size.moderateScale(30),
});

export const orderedItem = () => ({
  padding: size.moderateScale(20),
  backgroundColor: color.white,
  borderRadius: size.moderateScale(8),
  elevation: size.moderateScale(7),
  marginBottom: size.moderateScale(24),
  marginHorizontal: size.moderateScale(16),
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
});

export const lightText = () => ({
  color: color.darkGray,
  fontFamily: fonts.metropolisRegular,
  fontSize: fontSize.small
});

export const darkText = () => ({
  color: color.mostlyBlack,
  fontFamily: fonts.metropolisRegular,
  fontSize: fontSize.small
});

export const darkBoldText = () => ({
  color: color.mostlyBlack,
  fontFamily: fonts.metropolisSemiBold,
  fontSize: fontSize.small
});

export const quantityAmout = () => ({
  color: color.mostlyBlack,
  fontFamily: fonts.metropolisRegular,
  fontSize: fontSize.small
});

export const button = () => ({
  width: size.moderateScale(100)
});

export const successText = () => ({
  color: color.success,
  fontFamily: fonts.metropolisRegular,
  fontSize: fontSize.small
});

export const flatListOrder = () => ({
  paddingBottom: size.moderateScale(30)
});



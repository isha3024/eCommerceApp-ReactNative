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
  paddingHorizontal: size.moderateScale(16), 
  marginVertical: size.moderateScale(24)
});

export const orderDetails = () => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
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


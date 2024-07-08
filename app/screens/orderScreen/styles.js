import { color, fonts, fontSize, size } from "../../theme";

export const mainView = () => ({
  flex: 1,
  backgroundColor: color.primary
});

export const header = () => ({
  // backgroundColor: color.primary,
  paddingHorizontal: size.moderateScale(14),
});

export const mainTitle = () => ({
  fontSize: fontSize.middleLarge,
  fontFamily: fonts.metropolisBold,
  color: color.mostlyBlack,
  paddingTop: size.moderateScale(30),
  // backgroundColor: color.primary,
  paddingHorizontal: size.moderateScale(14),
});

export const topView = () => ({
});

export const middleView = () => ({
  marginVertical: size.moderateScale(24)
});

export const flatListOrder = () => ({
  paddingBottom: size.moderateScale(30)
});



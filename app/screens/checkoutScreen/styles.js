import { color, fonts, fontSize, size } from "../../theme";

export const mainView = () => ({
  flex: 1,
  backgroundColor: color.primary
})

export const topView = () => ({
  backgroundColor: color.primary
})

export const header = () => ({
  paddingHorizontal: size.moderateScale(16),
  elevation: size.moderateScale(10)
})

export const middleView = () => ({
  marginVertical: size.moderateScale(10),
  paddingHorizontal: size.moderateScale(16)
})

export const sectionTitle = () => ({
  fontSize: fontSize.littleMedium,
  fontFamily: fonts.metropolisSemiBold,
  color: color.mostlyBlack,
  marginVertical: size.moderateScale(20)
})

export const addressContainer = () => ({
  backgroundColor: color.white,
  paddingVertical: size.moderateScale(25),
  paddingHorizontal: size.moderateScale(28),
  borderRadius: size.moderateScale(8),
  gap: size.moderateScale(7),
  elevation: size.moderateScale(5)
})

export const changeAddress = () => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const username = () => ({
  fontFamily: fonts.metropolisMedium,
  fontSize: fontSize.small,
  color: color.mostlyBlack
})

export const redText = () => ({
  fontFamily: fonts.metropolisMedium,
  fontSize: fontSize.small,
  color: color.secondary
})

export const addressLines = () => ({
  
})

export const bodyText = () => ({
  fontFamily: fonts.metropolisRegular,
  fontSize: fontSize.small,
  color: color.mostlyBlack
})

export const paymentContainer = () => ({
  // backgroundColor: color.error,
  marginTop: size.moderateScale(40),
  marginBottom: size.moderateScale(10)
})

export const pamentSectionTitle = () => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const paymentDetails = () => ({
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  marginVertical: size.moderateScale(17),
  gap: size.moderateScale(17)
})

export const paymnetCard = () => ({
  width: size.moderateScale(64),
  height: size.moderateScale(38),
  backgroundColor: color.white,
  borderRadius: size.moderateScale(8),
  justifyContent: 'center',
  alignItems: 'center',
  elevation: size.moderateScale(4)
})

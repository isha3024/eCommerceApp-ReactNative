import { color, size, fontSize, fonts } from "../../theme";

export const mainView = () => ({
  flex: 1,
  backgroundColor: color.primary
})

export const topView = () => ({
  paddingHorizontal: size.moderateScale(14),
  gap: size.moderateScale(18)
})

export const header = () => ({
  
})

export const mainTitle = () => ({
  color: color.mostlyBlack,
  fontSize: fontSize.middleLarge,
  fontFamily: fonts.metropolisBold
})

export const personalInfo = () => ({
  marginTop: size.moderateScale(34),
  paddingHorizontal: size.moderateScale(16),
  gap: size.moderateScale(24)
})


export const sectionTitle = () => ({
  fontSize: fontSize.littleMedium,
  fontFamily: fonts.metropolisSemiBold,
  color: color.mostlyBlack
})

export const passwordView = () => ({
  marginTop: size.moderateScale(50),
  paddingHorizontal: size.moderateScale(16),
  gap: size.moderateScale(20)
})

export const passwordTitle = () => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginRight: size.moderateScale(5)
})

export const changePasswordText = () => ({
 fontFamily: fonts.metropolisMedium,
 fontSize: fontSize.small,
 color: color.darkGray
})

export const notification = () => ({
  marginTop: size.moderateScale(55),
  paddingHorizontal: size.moderateScale(16),
  gap: size.moderateScale(24)
})

export const notificationItem = () => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between'
})

export const notificationTitle = () => ({
  fontFamily: fonts.metropolisMedium,
  fontSize: fontSize.small,
  color: color.mostlyBlack
})

export const notificationSwitch = () => ({
  
})

export const passwordChangeView = () => ({
  gap: size.moderateScale(18)
})

export const bottomSheetTitle = () => ({
  fontFamily: fonts.metropolisSemiBold,
 fontSize: fontSize.middleMedium,
 color: color.mostlyBlack,
 textAlign: 'center'
})

export const forgetPassword = () => ({
  alignItems: 'flex-end',
  marginHorizontal: size.moderateScale(16),
  gap: size.moderateScale(14)
})

export const newPassword = () => ({
  marginTop: size.moderateScale(10),
  marginHorizontal: size.moderateScale(16),
  gap: size.moderateScale(14),
  marginBottom: size.moderateScale(30)
})
export const button = () => ({
  marginHorizontal: size.moderateScale(16),
  gap: size.moderateScale(14),
  marginBottom: size.moderateScale(30)
})
export const modalContainer = () => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color.customTransparent(0.7),
})

export const calendarContainer = () => ({
  backgroundColor: color.white,
  borderRadius: size.moderateScale(10),
  padding: size.moderateScale(20),
  alignItems: 'center',
})
export const closeButton = () => ({
  marginTop: size.moderateScale(10),
  padding: size.moderateScale(10),
  backgroundColor: color.secondary,
  borderRadius: size.moderateScale(5),
})
export const closeButtonText = () => ({
  color: color.white,
  fontWeight: 'bold',
})
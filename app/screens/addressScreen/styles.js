import { color, fonts, fontSize, size } from "../../theme"

export const mainView = () => ({
  flex: 1,
  backgroundColor: color.primary
}) 

export const topView = () => ({
  
}) 

export const header = () => ({
  paddingHorizontal: size.moderateScale(16),
  elevation: size.moderateScale(7),
  zIndex: size.moderateScale(1)
}) 

export const middleView = () => ({
  flex: 1,
}) 

export const addressCardList = () => ({
  flex: 1,
  gap: size.moderateScale(24),
  paddingVertical: size.moderateScale(35),
}) 

export const addressCard = () => ({
  paddingVertical: size.moderateScale(18),
  paddingHorizontal: size.moderateScale(24),
  backgroundColor: color.white,
  marginHorizontal: size.moderateScale(16),
  borderRadius: size.moderateScale(8),
  gap: size.moderateScale(10),
  elevation: size.moderateScale(4)
}) 

export const userNameView = () => ({
  flexDirection: 'row',
  justifyContent: 'space-between'
}) 

export const userName = () => ({
  fontFamily: fonts.metropolisMedium,
  fontSize: fontSize.small,
  color: color.mostlyBlack
}) 

export const editBtnText = () => ({
  fontFamily: fonts.metropolisMedium,
  fontSize: fontSize.small,
  color: color.secondary
}) 

export const addressWrapper = () => ({
  
}) 

export const addressLine = () => ({
  fontFamily: fonts.metropolisRegular,
  fontSize: fontSize.small,
  color: color.mostlyBlack
}) 

export const checkboxView = (opacity) => ({
  alignSelf: 'flex-start',
  opacity: opacity ? 0.6 : 1,
  marginTop: size.moderateScale(6)
})

export const checkboxButton = () => ({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: size.moderateScale(10),
})

export const bodyText = () => ({
  fontFamily: fonts.metropolisRegular,
  fontSize: fontSize.small,
  color: color.mostlyBlack
})

export const addAddress = () => ({
  alignItems: 'flex-end',
  paddingHorizontal: size.moderateScale(16),
  paddingVertical: size.moderateScale(10) 
})

export const addNewCardBtn = () => ({
  backgroundColor: color.mostlyBlack,
  alignItems: 'center',
  justifyContent: 'center',
  width: size.moderateScale(36),
  height: size.moderateScale(36),
  borderRadius: size.moderateScale(20),
  elevation: size.moderateScale(5)
})
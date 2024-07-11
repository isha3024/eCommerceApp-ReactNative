import { color, fonts, fontSize, size } from "../../theme"

export const mainView = () => ({
  flex: 1,
})

export const topView = () => ({

})

export const header = () => ({
  paddingHorizontal: size.moderateScale(16),
  backgroundColor: color.white,
  elevation: size.moderateScale(6)
})

export const middleView = () => ({
  marginTop: size.moderateScale(25),
})

export const sectionTitle = () => ({
  fontFamily: fonts.metropolisSemiBold,
  fontSize: fontSize.littleMedium,
  color: color.mostlyBlack,
  marginHorizontal: size.moderateScale(16)
})

export const paymentCardsList = () => ({
  marginTop: size.moderateScale(20),
  marginBottom: size.moderateScale(50),
})

export const contentContainerStyle = () => ({
  gap: size.moderateScale(40),
  alignItems: 'center'
})

export const paymentCardWrapper = () => ({
  alignItems: 'center',
  width: size.moderateScale(343),
  gap: size.moderateScale(20),
})

export const image = (opacity) => ({
  width: '100%',
  borderRadius: size.moderateScale(8),
  overflow: 'hidden',
  elevation: size.moderateScale(5),
  backgroundColor: color.primary,
  opacity: opacity ? 0.6 : 1,
})

export const cardDetails = () => ({
  paddingHorizontal: size.moderateScale(40),
  paddingVertical: size.moderateScale(32),
  gap: size.moderateScale(30)
})

export const cardNumber = () => ({
  fontFamily: fonts.metropolisMedium,
  fontSize: fontSize.middleSmallMedium,
  color: color.white
})

export const cardBottom = () => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: size.moderateScale(35)
})

export const keyValue = () => ({
  alignItems: 'center',
  gap: size.moderateScale(5)
})

export const textKeySmall = () => ({
  fontFamily: fonts.metropolisSemiBold,
  fontSize: fontSize.mediumSmall,
  color: color.white
})

export const textKeyLarge = () => ({
  fontFamily: fonts.metropolisSemiBold,
  fontSize: fontSize.small,
  color: color.white
})

export const checkboxView = (opacity) => ({
  alignSelf: 'flex-start',
  opacity: opacity ? 0.6 : 1
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

export const bottomView = () => ({
  alignItems: 'flex-end',
  paddingHorizontal: size.moderateScale(16)
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

export const bottomSheetTitle = () => ({
  textAlign: 'center',
  fontSize: fontSize.middleMedium,
  fontFamily: fonts.metropolisSemiBold,
  color: color.mostlyBlack,
  marginVertical: size.moderateScale(5)
})

export const newCardItemDetails = () => ({
  gap: size.moderateScale(20),
  marginHorizontal: size.moderateScale(16),
  marginVertical: size.moderateScale(18)
})

export const checkboxViewBottomSheet = () => ({
  marginHorizontal: size.moderateScale(16),
  flexDirection: 'row',
  alignItems: 'center',
  gap: size.moderateScale(13),
  marginTop: size.moderateScale(10),
  marginBottom: size.moderateScale(20),
})

export const button = () => ({
  marginHorizontal: size.moderateScale(16),
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

export const inputBottomSheet = () => ({
  borderRadius: size.moderateScale(8),
  fontSize: fontSize.small,
  backgroundColor: color.white,
  color: color.mostlyBlack,
  padding: size.moderateScale(20)
})

export const modalContentContainer = () => ({
 
})
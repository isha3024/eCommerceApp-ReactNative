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
  flex:1,
})


export const sectionTitle = () => ({
  marginTop: size.moderateScale(20),
  fontFamily: fonts.metropolisSemiBold,
  fontSize: fontSize.littleMedium,
  color: color.mostlyBlack,
  marginHorizontal: size.moderateScale(16)
})

export const paymentCardView = () => ({
  flex: 1
})

export const noPaymentCardView = () => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  gap: size.moderateScale(15)
})

export const noPaymentCardText = () => ({
  fontFamily: fonts.metropolisMedium,
  fontSize: fontSize.middleSmallMedium,
  color: color.mostlyBlack,
})

export const noPaymentCardBtn = () => ({
  paddingHorizontal: size.moderateScale(15),
  paddingVertical: size.moderateScale(10),
})

export const paymentCardsList = () => ({
  marginTop: size.moderateScale(20),
})

export const contentContainerStyle = () => ({
  gap: size.moderateScale(40),
  alignItems: 'center',
  paddingBottom: size.moderateScale(200)
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
  opacity: opacity ? 1 : 0.6,
})

export const cardDetails = () => ({
  paddingHorizontal: size.moderateScale(40),
  paddingVertical: size.moderateScale(32),
  gap: size.moderateScale(30)
})

export const cardNumber = () => ({
  fontFamily: fonts.metropolisMedium,
  fontSize: fontSize.middleSmallMedium,
  color: color.white,
  letterSpacing: size.moderateScale(5)
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
  position: 'absolute',
  bottom: 0,
  width: '100%',
  height: size.moderateScale(100),
})

export const linearGradient = () => ({
  flex: 1,
  width: '100%'
});

export const addNewCardBtn = () => ({
  position: 'absolute',
  bottom: size.moderateScale(20),
  right: size.moderateScale(20),
  justifyContent: 'center',
  alignItems: 'center',
  width: size.moderateScale(36),
  height: size.moderateScale(36),
  backgroundColor: color.mostlyBlack,
  borderRadius: size.moderateScale(18),
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
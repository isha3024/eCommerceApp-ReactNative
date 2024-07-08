import { color, fonts, fontSize, size } from "../../theme";


export const mainView = () => ({
  flex: 1,
  backgroundColor: color.primary
});

export const header = () => ({
  paddingHorizontal: size.moderateScale(15),
  elevation: size.moderateScale(8),
  zIndex: size.moderateScale(1),
  backgroundColor: color.white
});

export const orderNoAndDate = () => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: size.moderateScale(30),
  paddingHorizontal: size.moderateScale(16)
});
export const justifySpaceBetween = () => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: size.moderateScale(15),
  paddingHorizontal: size.moderateScale(16)
});

export const h2 = () => ({
  color: color.mostlyBlack,
  fontSize: fontSize.littleMedium,
  fontFamily: fonts.metropolisSemiBold
});

export const trackingNumValue = () => ({
  color: color.mostlyBlack,
  fontSize: fontSize.small,
  fontFamily: fonts.metropolisMedium,
});

export const lightText = () => ({
  color: color.darkGray,
  fontFamily: fonts.metropolisRegular,
  fontSize: fontSize.small,
  flex: 0.5
});

export const date = () => ({
  color: color.darkGray,
  fontFamily: fonts.metropolisRegular,
  fontSize: fontSize.small,
});

export const paymentText = () => ({
  color: color.darkGray,
  fontFamily: fonts.metropolisRegular,
  fontSize: fontSize.small,
  flex: 1
});

export const paymentRow = () => ({
  flexDirection: 'row',
  flex: 1
});
export const flexRow = () => ({
  flexDirection: 'row',
});

export const darkText = () => ({
  color: color.mostlyBlack,
  fontFamily: fonts.metropolisRegular,
  fontSize: fontSize.small
});

export const orderInfoTitle = () => ({
  color: color.mostlyBlack,
  fontFamily: fonts.metropolisMedium,
  fontSize: fontSize.small,
  marginBottom: size.moderateScale(15),
});

export const successText = () => ({
  color: color.success,
  fontFamily: fonts.metropolisMedium,
  fontSize: fontSize.small
});

export const darkTextItem = () => ({
  color: color.mostlyBlack,
  fontFamily: fonts.metropolisMedium,
  fontSize: fontSize.small,
  marginTop: size.moderateScale(15),
  marginHorizontal: size.moderateScale(16)
});

export const orderedItemsList = () => ({
  marginHorizontal: size.moderateScale(16),
  gap: size.moderateScale(24),
  marginTop: size.moderateScale(18)
});

export const orderInfo = () => ({
  marginHorizontal: size.moderateScale(16),
  marginTop: size.moderateScale(34),
  marginBottom: size.moderateScale(34),
});

export const information = () => ({
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  marginBottom: size.moderateScale(24)
})

export const darkTextAddress = () => ({
  color: color.mostlyBlack,
  fontFamily: fonts.metropolisMedium,
  fontSize: fontSize.small,
  flex: 1
})

export const darkTextMedium = () => ({
  color: color.mostlyBlack,
  fontFamily: fonts.metropolisMedium,
  fontSize: fontSize.small,
  textAlign: 'start',
  flex: 1
});

export const cardNum = () => ({
  color: color.mostlyBlack,
  fontFamily: fonts.metropolisMedium,
  fontSize: fontSize.small,
  textAlign: 'start',
});

export const masterCard = () => ({
  marginRight: size.moderateScale(15),
  alignSelf: 'center'
});

export const informationCenter = () => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: size.moderateScale(24),
})

export const buttonContainer = () => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: size.moderateScale(20),
  marginBottom: size.moderateScale(100),
  marginHorizontal: size.moderateScale(15)
})

export const button = () => ({
  width: size.moderateScale(160),
  paddingVertical: size.moderateScale(12)
})
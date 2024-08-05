import {color, fontSize, fonts, size} from '../../theme';

export const mainView = () => ({
  backgroundColor: color.primary,
});
export const topView = () => ({});
export const imageBg = () => ({
  width: size.deviceWidth,
  height: size.deviceHeight * (2.5/4)
});

export const imageOverlayText = () => ({
  width: size.deviceWidth * 0.6,
  position: 'absolute',
  bottom: size.moderateScale(32),
  left: size.moderateScale(15)
});

export const linearGradient = () => ({
  flex: 1
});

export const title = () => ({
  color: color.white,
  fontSize: fontSize.extraLarge,
  fontFamily: fonts.metropolisBold
});

export const buttonTop = () => ({
  marginTop: size.moderateScale(18),
  width: size.moderateScale(135),
  paddingVertical:size.moderateScale(10)
});

export const bottomTabView = () => ({
  marginTop: size.moderateScale(30),
  paddingLeft: size.moderateScale(15),
});

export const productListHorizontalTop = () => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingRight: size.moderateScale(15)
});

export const link = () => ({
  fontSize: fontSize.mediumSmall,
  color: color.mostlyBlack,
  fontFamily: fonts.metropolisRegular,
  marginBottom: size.moderateScale(15)
});

export const textLight = () => ({
  fontSize: fontSize.mediumSmall,
  color: color.darkGray,
  fontFamily: fonts.metropolisRegular,
  marginTop: size.moderateScale(4),
  marginBottom: size.moderateScale(20)
});

export const productCardHome = () => ({
  marginRight: size.moderateScale(16)
});

export const flotingBtnStyle = () => ({
  top: size.moderateScale(163),
  right: size.moderateScale(16)
});

export const titleBottomSheet = () => ({
  fontSize: fontSize.middleMedium,
  fontFamily: fonts.metropolisSemiBold,
  color: color.mostlyBlack,
  textAlign: 'center',
  marginBottom: size.moderateScale(10),
})

export const sizeContainer = () => ({
  marginHorizontal: size.moderateScale(16),
  flexDirection: 'row',
  flexWrap: 'wrap',
  columnGap: size.moderateScale(10),
  rowGap: size.moderateScale(10),
  marginTop: size.moderateScale(22)
})

export const sizeItem = (isSelected) => ({
  width: '30%',
  height: size.moderateScale(40),
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: isSelected ? color.secondary : color.white,
  borderColor: isSelected ? color.secondary : color.darkGray,
  borderWidth: size.moderateScale(1),
  borderRadius: size.moderateScale(8)
})

export const sizeText = (isSelected) => ({
  color: isSelected ? color.white :color.mostlyBlack,
  fontSize: fontSize.small,
  fontFamily: fonts.metropolisMedium
})

export const sizeInfo = () => ({
  marginTop: size.moderateScale(22),
  borderTopWidth: size.moderateScale(0.5),
  borderBottomWidth: size.moderateScale(0.5),
  borderTopColor: color.darkGray,
  borderBottomColor: color.darkGray,
  padding: size.moderateScale(16),
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between'
})

export const sizeInfoText = () => ({
  fontSize: fontSize.littleMedium,
  fontFamily: fonts.metropolisRegular,
  color: color.mostlyBlack
})

export const forwardArrow = () => ({
  transform: [{rotate: '180deg'}],
})

export const button = () => ({
  marginTop: size.moderateScale(28),
  marginHorizontal: size.moderateScale(16)
})

import { color, fontSize, fonts, size } from "../../theme"

export const mainView = () => ({
  backgroundColor: color.primary,
  flex: 1,
})

export const topView = () => ({
})

export const header = (showHeaderTitle) => ({
  elevation: showHeaderTitle ? size.moderateScale(10) : 0,
  paddingHorizontal: size.moderateScale(14)
})

export const middleView = () => ({
})


export const mainTitle = () => ({
  fontSize: fontSize.middleLarge,
  fontFamily: fonts.metropolisBold,
  color: color.mostlyBlack,
  paddingHorizontal: size.moderateScale(10),
  marginTop: size.moderateScale(14)
})

export const mainRatingView = () => ({
  marginTop: size.moderateScale(40),
  paddingLeft: size.moderateScale(15),
  paddingRight: size.moderateScale(30),
  flexDirection: 'row',
  alignItems: 'flex-start'
})
export const leftRating = () => ({
  flex: size.moderateScale(0.5),
})
export const rightRating = () => ({
  flex: size.moderateScale(1),
  flexDirection: 'row',
  gap: size.moderateScale(10)
})
export const ratingsPoint = () => ({
  fontSize: fontSize.mediumLarge,
  fontFamily: fonts.metropolisSemiBold,
  color: color.mostlyBlack
})

export const ratingsNumber = () => ({
  fontSize: fontSize.small,
  fontFamily: fonts.metropolisRegular,
  color: color.darkGray
})

export const ratingStar = () => ({
  gap: size.moderateScale(5)
})
export const starContainer = () => ({
  flexDirection: 'row',
  alignItem: 'flex-end',
  gap: size.moderateScale(2)
})
export const ratingLine = () => ({
  flex: 1,
  gap: size.moderateScale(8)
})

export const widthLineFull = () => ({
  width: size.moderateScale(114),
  height: size.moderateScale(8),
  backgroundColor: color.secondary,
  borderRadius: size.moderateScale(4),
  marginTop: size.moderateScale(2)
})

export const widthLine40 = () => ({
  width: size.moderateScale(40),
  height: size.moderateScale(8),
  backgroundColor: color.secondary,
  borderRadius: size.moderateScale(4),
})

export const widthLine30 = () => ({
  width: size.moderateScale(30),
  height: size.moderateScale(8),
  backgroundColor: color.secondary,
  borderRadius: size.moderateScale(4)
})

export const widthLine15 = () => ({
  width: size.moderateScale(15),
  height: size.moderateScale(8),
  backgroundColor: color.secondary,
  borderRadius: size.moderateScale(4)
})

export const widthLine8 = () => ({
  width: size.moderateScale(8),
  height: size.moderateScale(8),
  backgroundColor: color.secondary,
  borderRadius: size.moderateScale(4)
})

export const ratingNum = () => ({
  alignItems: 'flex-end',
  gap: size.moderateScale(5)
})

export const peopleRating = () => ({
  fontSize: fontSize.small,
  color: color.darkGray,
  fontFamily: fonts.metropolisRegular,
})

export const reviewBlock = () => ({
  marginTop: size.moderateScale(33),
  paddingLeft: size.moderateScale(10),
  paddingRight: size.moderateScale(25),
})

export const reviewHeading = () => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: size.moderateScale(6),
  paddingRight: size.moderateScale(7),
})

export const h2 = () => ({
  fontSize: fontSize.medium,
  color: color.mostlyBlack,
  fontFamily: fonts.metropolisSemiBold
})

export const withPhoto = () => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between'
})

export const bodyText = () => ({
  fontSize: fontSize.small,
  fontFamily: fonts.metropolisRegular,
  color: color.mostlyBlack,
  marginLeft: size.moderateScale(13)
})

export const customerReviewMainBlock = () => ({
  marginTop: size.moderateScale(28),
  marginBottom: size.moderateScale(20),
  // backgroundColor: color.error,
  paddingBottom: size.moderateScale(300)
})

export const customerReviewBlock = () => ({
  padding: size.moderateScale(10),
  marginBottom: size.moderateScale(20),
  // marginTop: size.moderateScale(10),
  position: 'relative'
})

export const flatListContainer = () => ({
  paddingBottom: size.moderateScale(250),
  flexGrow: 1,
})

export const avatar = () => ({
  borderRadius: size.moderateScale(30),
  position: 'absolute',
  left: 0,
  top: 0,
})

export const img = () => ({
  width: size.moderateScale(40),
  height: size.moderateScale(40),
  borderRadius: size.moderateScale(50),
  overflow: 'hidden'
})

export const customerReview = () => ({
  zIndex: size.moderateScale(-10),
  backgroundColor: color.white,
  paddingHorizontal: size.moderateScale(24),
  paddingTop: size.moderateScale(30),
  paddingBottom: size.moderateScale(24),
  borderRadius: size.moderateScale(8),
  elevation: size.moderateScale(8)
})

export const customerName = () => ({
  fontSize: fontSize.small,
  fontFamily: fonts.metropolisSemiBold,
  color: color.mostlyBlack,
})

export const spaceBetween = () => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: size.moderateScale(10)
})

export const reviewProductImages = () => ({
  alignItems: 'center',
  gap: size.moderateScale(16)
})

export const toggleImagesView = () => ({
  opacity: 1
})

export const reviewProductImgItem = () => ({
  width: size.moderateScale(104),
  height: size.moderateScale(104),
  borderRadius: size.moderateScale(8)
})

export const lightText = () => ({
  fontSize: fontSize.mediumSmall,
  fontFamily: fonts.metropolisRegular,
  color: color.darkGray,
})

export const reviewDesc = () => ({
  fontSize: fontSize.small,
  fontFamily: fonts.metropolisRegular,
  color: color.mostlyBlack,
  lineHeight: size.moderateScale(23),
  marginVertical: size.moderateScale(11)
})

export const customerProductImages = () => ({
  gap: size.moderateScale(16),
})

export const textRight = () => ({
  flexDirection: 'row',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
  gap: size.moderateScale(7),
  marginTop: size.moderateScale(10)
})

export const bottomView = () => ({
  position: 'absolute',
  bottom: 0,
  width: '100%',
  height: 200,
})

export const linearGradient = () => ({
  flex: 1,
  width: '100%'
});

export const reviewButton = () => ({
  position: 'absolute',
  bottom: size.moderateScale(16),
  right: size.moderateScale(16),
  width: size.moderateScale(128)
});

export const reviewButtonText = () => ({
  fontSize: fontSize.mediumSmall
});

export const bottomSheetStyle = () => ({
  fontSize: fontSize.mediumSmall
});

export const addReviewTitle = () => ({
  fontSize: fontSize.middleMedium,
  fontFamily: fonts.metropolisSemiBold,
  color: color.mostlyBlack,
  textAlign: 'center'
});

export const rateStars = () => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: size.moderateScale(24),
  marginTop: size.moderateScale(16)
});

export const reviewBodyText = () => ({
  fontSize: fontSize.middleMedium,
  fontFamily: fonts.metropolisSemiBold,
  color: color.mostlyBlack,
  textAlign: 'center',
  width: '70%',
  marginHorizontal: 'auto',
  marginTop: size.moderateScale(32)
});

export const reviewText = () => ({
  fontSize: fontSize.small,
  fontFamily: fonts.metropolisRegular,
  color: color.mostlyBlack,
  marginTop: size.moderateScale(18),
  marginHorizontal: size.moderateScale(16),
  backgroundColor: color.white,
  padding: size.moderateScale(20),
  borderRadius: size.moderateScale(8),
  textAlignVertical: 'top',
  marginBottom: size.moderateScale(20),
  elevation: size.moderateScale(4)
});

export const cameraRollUpdate = () => ({
  paddingHorizontal: size.moderateScale(16),
  marginVertical: size.moderateScale(25),
  flexDirection: 'row',
});

export const cameraView = () => ({
  width: size.moderateScale(104),
  height: size.moderateScale(104),
  borderRadius: size.moderateScale(8),
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color.primary,
  gap: size.moderateScale(12),
  elevation: size.moderateScale(4)
});

export const productReviewImgWrapper = () => ({
  width: size.moderateScale(104),
  height: size.moderateScale(104),
  borderRadius: size.moderateScale(8),
  overflow: 'hidden'
});

export const productReviewImg= () => ({
  width: '100%',
  height: '100%',
});

export const cameraText = () => ({
  fontSize: fontSize.mediumSmall,
  fontFamily: fonts.metropolisRegular,
  color: color.mostlyBlack,
});

export const buttonSendReview = () => ({
  marginHorizontal: size.moderateScale(16),
  marginTop: size.moderateScale(25)
});

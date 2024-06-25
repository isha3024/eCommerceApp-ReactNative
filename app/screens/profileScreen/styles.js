import {color, fontSize, fonts, size} from '../../theme';

export const mainView = () => ({
  flex: 1,
  backgroundColor: color.white,
});
export const headerCustomStyle = () => ({
  backgroundColor: color.white,
  borderBottomRadius: size.moderateScale(10),
});
export const headerTextStyle = () => ({
  fontSize: fontSize.middleMedium,
  fontFamily: fonts.poppinsSemiBold,
  color: color.primary,
  textTransform: 'capitalize',
  alignSelf: 'center',
  right: size.moderateScale(15),
});
export const leftView = () => ({
  alignItems: 'center',
  height: size.moderateScale(20),
  width: size.moderateScale(20),
});
export const rightView = () => ({
  position: 'absolute',
  flexDirection: 'row',
  right: 0,
  width: size.deviceWidth * 0.28,
  top: size.moderateScale(-25),
});
export const deleteContainer = () => ({
  // left: size.moderateScale(95),

  borderRadius: size.moderateScale(50),
  alignItems: 'center',
  justifyContent: 'center',
  height: size.moderateScale(50),
  width: size.moderateScale(50),
});
export const mainContainer = () => ({
  borderRadius: size.moderateScale(10),
  padding: size.moderateScale(10),
  margin: size.moderateScale(10),
});

export const nameText = subText => ({
  fontSize: subText ? fontSize.small : fontSize.smallMedium,
  color: subText ? color.black : color.primaLight,
  fontFamily: fonts.poppinsRegular,
  left: size.moderateScale(10),
});
export const lowerContainer = () => ({});
export const referText = () => ({
  fontSize: fontSize.middleMedium,
  color: color.primaLight,
  fontFamily: fonts.poppinsSemiBold,
  marginTop: size.moderateScale(5),
  marginBottom: size.moderateScale(10),
});
export const dropDownView = () => ({
  flexGrow: 1,
});
export const innerContainer = () => ({
  height: size.deviceHeight / 2.6,
  width: size.deviceWidth * 0.87,
  left: size.moderateScale(1),
  borderRadius: size.moderateScale(5),
  // borderWidth: size.moderateScale(0.3),
  top: size.moderateScale(15),
});
export const dataCard = () => ({
  // padding: size.moderateScale(15),
  borderRadius: size.moderateScale(5),
  // borderWidth: size.moderateScale(1),
  borderColor: color.customBlack(0.3),
  // alignItems:'center',
  backgroundColor: color.white,
  elevation: size.moderateScale(2),
});
export const flexContainer = colors => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: size.moderateScale(5),
  backgroundColor: colors ? color.primaLight : color.white,
  borderTopLeftRadius: size.moderateScale(5),
  borderTopRightRadius: size.moderateScale(5),
});
export const textStyle = name => ({
  fontSize: fontSize.small + 1,
  color: name ? color.red : color.primary,
  fontFamily: name ? fonts.poppinsSemiBold : fonts.poppinsMedium,
  // textAlign: 'right',
});
export const textNameStyle = () => ({
  fontSize: fontSize.small + 1,
  color: color.primary,
  fontFamily: fonts.poppinsMedium,
  // textAlign: 'right',
});
export const descriptionContainer = () => ({
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  marginVertical: size.moderateScale(10),
});
export const textLabelStyle = name => ({
  fontSize: name ? fontSize.smallMedium : fontSize.littleMedium,
  color: color.customBlack(0.5),
  fontFamily: name ? fonts.poppinsSemiBold : fonts.poppinsMedium,
  // textAlign: 'right',
});
export const coursesContainer = () => ({
  // flex:1
});
export const dropdown = () => ({
  backgroundColor: color.white,
  height: size.moderateScale(50),
  borderColor: color.customBlack(0.3),
  borderWidth: size.moderateScale(1),
  paddingHorizontal: size.moderateScale(11),
  borderRadius: size.moderateScale(10),
  alignItems: 'center',
});
export const selectedPlaceholderStyle = () => ({
  color: color.black,
  fontSize: fontSize.small,
  // top: size.moderateScale(5),
});
export const firstDropdownContainer = () => ({
  borderTopWidth: 0,
  borderWidth: 0,
  // borderRadius: 10,

  backgroundColor: color.white,
  borderBottomLeftRadius: size.moderateScale(10),
  borderBottomRightRadius: size.moderateScale(10),
  // marginHorizontal: size.moderateScale(1),

  marginTop: size.moderateScale(-2),
});
export const selectedTextStyle = () => ({
  fontFamily: fonts.poppinsRegular,
  fontSize: fontSize.small,
  color: color.black,
});
export const profileItemCardContainer = () => ({
  // backgroundColor: color.customBlack(0.1),
  borderWidth: size.moderateScale(1),
  borderColor: color.customBlack(0.1),
  flexDirection: 'row',
  height: size.moderateScale(70),
  borderRadius: size.moderateScale(10),
  overflow: 'hidden',
  marginBottom: size.moderateScale(10),
});
export const leftContainer = () => ({
  // borderWidth: 1,
  justifyContent: 'center',
  alignItems: 'center',
  width: size.moderateScale(60),
  height: '100%',
});
export const iconStyle = () => ({
  height: size.moderateScale(32),
  width: size.moderateScale(32),
  borderRadius: size.moderateScale(15),
});
export const rightContainer = () => ({
  flex: 1,
  padding: size.moderateScale(10),
  justifyContent: 'center',
  paddingVertical: size.moderateScale(5),
});
export const titleText = name => ({
  fontSize: fontSize.littleMedium,
  color: name ? color.customBlack(0.5) : color.customBlack(0.3),
  fontFamily: fonts.poppinsSemiBold,
});
export const descriptionText = () => ({
  fontSize: fontSize.middleMedium,
  color: color.primary,
  fontFamily: fonts.poppinsMedium,
  textTransform: 'capitalize',
});
export const modelContainer = () => ({
  paddingVertical: size.moderateScale(30),
  backgroundColor: color.white,
  borderRadius: size.moderateScale(20),
  //   alignItems: 'center',
  justifyContent: 'center',
});
export const btnMainContainer = () => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  paddingHorizontal: size.moderateScale(20),
});
export const buttonStyle = logout => ({
  backgroundColor: logout ? color.primary : color.white,
  paddingHorizontal: size.moderateScale(30),
  //   paddingVertical: size.moderateScale(0),
  borderRadius: size.moderateScale(10),
  borderWidth: size.moderateScale(1),
  borderColor: logout ? color.primary : color.customBlack(0.1),
});
export const cancelBtnStyle = logout => ({
  backgroundColor: color.white,
  paddingHorizontal: size.moderateScale(30),
  //   paddingVertical: size.moderateScale(0),
  borderRadius: size.moderateScale(10),
  borderWidth: size.moderateScale(1),
  borderColor: logout ? color.primary : color.customBlack(0.1),
});

export const btnRejectLabel = logout => ({
  // marginHorizontal: size.moderateScale(10),
  color: logout ? color.white : color.black,
  fontFamily: fonts.poppinsRegular,
  fontSize: fontSize.small,
  //   textTransform: 'none',
  includeFontPadding: false,
});
export const logoutText = () => ({
  // marginHorizontal: size.moderateScale(10),
  color: color.black,
  fontFamily: fonts.poppinsRegular,
  fontSize: fontSize.middleMedium,
  //   textTransform: 'none',
  includeFontPadding: false,
  textAlign: 'center',
});
export const logoutDescriptionText = () => ({
  color: color.customBlack(0.5),
  fontFamily: fonts.poppinsRegular,
  fontSize: fontSize.verySmall,
  includeFontPadding: false,
  textAlign: 'center',
  flexWrap: 'wrap',
  paddingTop: size.moderateScale(10),
  paddingBottom: size.moderateScale(25),
});
export const btnContentStyle = () => ({
  paddingVertical: size.moderateScale(12),
});
export const referralDetailCard = () => ({
  paddingVertical: size.moderateScale(12),
});

export const referCard = () => ({
  borderWidth: size.moderateScale(1),
  padding: size.moderateScale(10),
  borderRadius: size.moderateScale(10),
  borderColor: color.customBlack(0.2),
  marginBottom: size.moderateScale(10),
});
export const cardNameText = () => ({
  fontSize: fontSize.smallMedium,
  fontFamily: fonts.poppinsSemiBold,
  color: color.customBlack(0.8),
});
export const mobileText = () => ({
  fontSize: fontSize.small,
  fontFamily: fonts.poppinsSemiBold,
  color: color.customBlack(0.5),
  marginLeft: size.moderateScale(1),
});
export const callView = () => ({
  // justifyContent: 'space-evenly',
  alignItems: 'center',
  // width: size.moderateScale(0),
  flexWrap: 'wrap',
});
export const callIconView = () => ({
  height: size.moderateScale(28),
  width: size.moderateScale(28),
  borderRadius: size.moderateScale(20),
  backgroundColor: color.white,
  elevation: size.moderateScale(2),
  alignItems: 'center',
  justifyContent: 'center',
});
export const referredToDetailsView = () => ({
  flexDirection: 'row',
  // alignItems: 'center',
  justifyContent: 'space-between',
  // borderWidth: 1,
});
export const referLeftView = () => ({
  // flexWrap: 'wrap',
  width: size.moderateScale(92),
});
export const referCardRightView = () => ({
  height: '100%',
  alignItems: 'flex-end',
  // alignItems: 'center',
  // justifyContent: 'center',
});
export const referCardCoursesView = () => ({});
export const coursesView = () => ({
  flexDirection: 'row',
  paddingTop: size.moderateScale(10),
  flexWrap: 'wrap',
});
export const course = randomColor => ({
  paddingVertical: size.moderateScale(3),
  paddingHorizontal: size.moderateScale(5),
  borderRadius: size.moderateScale(12),
  marginRight: size.moderateScale(5),
  marginBottom: size.moderateScale(5),
  backgroundColor: randomColor,
  elevation: size.moderateScale(6),
});
export const courseText = () => ({
  fontSize: fontSize.small,
  fontFamily: fonts.poppinsMedium,
  color: color.white,
});
export const remarksText = () => ({
  fontSize: fontSize.small,
  fontFamily: fonts.poppinsMedium,
  color: color.customBlack(0.6),
  // textAlign: 'center',
});
export const courseHeading = () => ({
  fontSize: fontSize.small,
  fontFamily: fonts.poppinsMedium,
  color: color.customBlack(0.5),
  textTransform: 'capitalize',
});
export const feesText = () => ({
  fontSize: fontSize.small,
  fontFamily: fonts.poppinsMedium,
  color: color.customBlack(0.5),
  textTransform: 'capitalize',
});
export const studentFeesView = () => ({
  flexWrap: 'wrap',
});

export const feesTextColor = status => ({
  fontSize: fontSize.small,
  fontFamily: fonts.poppinsMedium,
  color: !status ? color.red : color.green,
});

export const scrollMainView = () => ({
  flex: 1,
  paddingBottom: size.moderateScale(20),
});
export const expandView = () => ({
  borderWidth: size.moderateScale(1),
  padding: size.moderateScale(10),
  marginTop: size.moderateScale(-11),
  borderRadius: size.moderateScale(10),
  borderColor: color.customBlack(0.2),
  marginBottom: size.moderateScale(10),
});
export const divider = () => ({
  backgroundColor: color.customBlack(0.1),
  height: size.moderateScale(1),
  marginBottom: size.moderateScale(1),
});
export const remarkLabel = () => ({
  fontSize: fontSize.small,
  fontFamily: fonts.poppinsMedium,
  color: color.primary,
  textTransform: 'capitalize',
});

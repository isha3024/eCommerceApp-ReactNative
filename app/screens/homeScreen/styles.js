import {color, fontSize, fonts, size} from '../../theme';

export const mainView = () => ({
  flex: 1,
  backgroundColor: color.white,
});
export const rootContainer = () => ({
  // flex: 1,
  backgroundColor: color.white,
});
export const middleContainer = () => ({
  flex: 1,
  flexDirection: 'row',
});
export const notificationView = () => ({
  // marginRight: size.moderateScale(20),
  // borderRadius: size.moderateScale(30),
  backgroundColor: color.white,
  height: size.moderateScale(40),
  width: size.moderateScale(40),
  // elevation: size.moderateScale(4),
  alignItems: 'center',
  justifyContent: 'center',
});
export const animatableView = () => ({
  justifyContent: 'center',
});
export const notificationIcon = () => ({
  height: size.moderateScale(20),
  width: size.moderateScale(20),
  alignSelf: 'center',
});
export const welcomeText = () => ({
  fontSize: fontSize.smallMedium,
  fontFamily: fonts.poppinsSemiBold,
  color: color.customBlack(0.7),
  textAlign: 'left',
});
export const headerCustomStyle = () => ({
  backgroundColor: color.white,
  borderBottomRadius: size.moderateScale(10),
});
export const btnStyle = () => ({
  width: size.deviceWidth * 0.3,
  // top: size.moderateScale(10),
});
export const innerContainer = () => ({
  flexDirection: 'row',
  paddingHorizontal: size.moderateScale(15),
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: size.moderateScale(20),
  marginHorizontal: size.moderateScale(10),
  // top: size.moderateScale(20),
});
export const profilePhoto = name => ({
  height: size.moderateScale(50),
  width: name ? size.moderateScale(50) : size.moderateScale(50),
  borderRadius: size.moderateScale(10),
});
export const appNameView = () => ({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
});
export const headerTextStyle = () => ({
  fontSize: fontSize.middleMedium,
  fontFamily: fonts.poppinsSemiBold,
  color: color.primary,
  // height: size.moderateScale(50),
  // width: size.moderateScale(50),
  textTransform: 'capitalize',
});
export const leftView = () => ({
  flexDirection: 'row',
  alignItems: 'center',
});
export const appNameText = () => ({
  fontSize: fontSize.small,
  fontFamily: fonts.poppinsSemiBold,
  color: color.primaLight,
  left: size.moderateScale(15),
});
export const outerView = radius => ({
  height: size.moderateScale(35),
  width: size.moderateScale(35),
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: radius ? size.moderateScale(20) : size.moderateScale(1),
  // borderWidth: size.moderateScale(1),
});
export const outerViewTwo = () => ({
  height: size.moderateScale(35),
  width: size.moderateScale(35),
  justifyContent: 'center',
  alignItems: 'center',
});
export const rightOuterView = () => ({
  height: size.moderateScale(45),
  width: size.moderateScale(45),
  justifyContent: 'center',
  alignItems: 'center',
  right: size.moderateScale(15),
  borderRadius: size.moderateScale(25),
  borderWidth: size.moderateScale(1),
});
export const images = () => ({
  height: size.deviceHeight / 2,
  width: size.deviceWidth,
});
export const imgUri = () => ({
  height: size.moderateScale(15),
  width: size.moderateScale(20),
});
export const imageContainer = () => ({
  height: size.moderateScale(30),
  width: size.moderateScale(30),
  position: 'absolute',
  backgroundColor: color.white,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: size.moderateScale(40),
  bottom: size.moderateScale(10),
  right: size.moderateScale(10),
  elevation: size.moderateScale(10),
});
export const renderItemView = () => ({
  elevation: size.moderateScale(10),
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.17,
  shadowRadius: 2.54,
  backgroundColor: color.white,
});
export const nameText = () => ({
  fontSize: fontSize.smallMedium,
  fontFamily: fonts.poppinsSemiBold,
  color: color.primaLight,
});
export const referralList = () => ({
  paddingHorizontal: size.moderateScale(25),
});
export const headingText = () => ({
  fontSize: fontSize.smallMedium,
  fontFamily: fonts.poppinsSemiBold,
  color: color.customBlack(0.7),
  textAlign: 'left',
  marginBottom: size.moderateScale(10),
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
  textTransform: 'capitalize',
});
export const mobileText = () => ({
  fontSize: fontSize.small,
  fontFamily: fonts.poppinsSemiBold,
  color: color.customBlack(0.5),
});
export const referredToDetailsView = () => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  // borderWidth: 1,
});
export const referLeftView = () => ({});
export const referCardRightView = () => ({
  height: '100%',
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
export const divider = () => ({
  backgroundColor: color.customBlack(0.1),
  height: size.moderateScale(1),
  marginVertical: size.moderateScale(5),
});
export const remarksText = () => ({
  fontSize: fontSize.small,
  fontFamily: fonts.poppinsMedium,
  color: color.customBlack(0.8),
});
export const remarkLabel = () => ({
  fontSize: fontSize.small,
  fontFamily: fonts.poppinsMedium,
  color: color.primary,
  textTransform: 'capitalize',
});

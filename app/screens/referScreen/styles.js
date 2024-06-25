import {color, fontSize, fonts, size} from '../../theme';

export const mainView = () => ({
  flex: 1,
  backgroundColor: color.white,
});
export const headerCustomStyle = () => ({
  backgroundColor: color.white,
  borderBottomRadius: size.moderateScale(10),
});
export const topContainer = () => ({
  paddingTop: size.moderateScale(20),
});
export const rootView = () => ({
  backgroundColor: color.white,
});
export const appLogo = () => ({
  height: size.moderateScale(120),
  width: size.moderateScale(120),
  alignSelf: 'center',
  borderRadius: size.moderateScale(10),
});
export const inputBoxView = () => ({
  padding: size.moderateScale(25),
  // paddingTop: size.moderateScale(20),
});
export const headerTextStyle = () => ({
  fontSize: fontSize.middleMedium,
  fontFamily: fonts.poppinsSemiBold,
  color: color.primary,
  textTransform: 'capitalize',
  alignSelf: 'center',
  right: size.moderateScale(35),
});
export const inputBoxStyle = focused => ({
  borderColor: !focused ? color.customBlack(0.3) : color.primary,
  paddingLeft: size.moderateScale(5),
});
export const inputBoxStyleTwo = focused => ({
  paddingLeft: size.moderateScale(5),
  borderColor: !focused ? color.customBlack(0.3) : color.primary,
});
export const inputBoxStyleThree = focused => ({
  borderColor: !focused ? color.customBlack(0.3) : color.primary,
  // marginTop: size.moderateScale(5),
  backgroundColor: color.white,
  paddingTop: size.moderateScale(10),
  paddingLeft: size.moderateScale(5),
});
export const dropDownView = () => ({
  // height: size.moderateScale(60),
  // width: size.deviceWidth * 0.86,
  // justifyContent: 'center',
  // paddingVertical:size.moderateScale(10),
  // borderRadius: size.moderateScale(10),
  // borderWidth: size.moderateScale(2),
  // borderColor: color.customBlack(0.3),
  // padding: 16
});
export const locationText = () => ({
  marginLeft: size.moderateScale(13),
  marginTop: size.moderateScale(10),
  fontFamily: fonts.justSansRegular,
  fontSize: fontSize.small,
  color: color.billDropDownPlace,
});
export const dropdown = () => ({
  // height: size.moderateScale(150),
  marginTop: size.moderateScale(5),
  backgroundColor: color.white,
  // paddingHorizontal: size.moderateScale(11),
  marginBottom: size.moderateScale(10),
});
export const labelView = () => ({
  paddingRight: size.moderateScale(15),
  marginBottom: size.moderateScale(10),
  // paddingHorizontal:size.moderateScale(15),
  borderColor: color.customBlack(0.3),
  borderRadius: size.moderateScale(10),
  height: size.moderateScale(60),
  backgroundColor: 'transparent',
  borderBottomColor: 'black',
  borderWidth: size.moderateScale(2),
});
export const selectedStyle = () => ({
  backgroundColor: color.white,
});
export const selectedPlaceholderStyle = () => ({
  color: color.customBlack(0.5),
  fontSize: fontSize.small,
  fontFamily: fonts.poppinsMedium,
  marginLeft: size.moderateScale(15),
  textTransform: 'capitalize',
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
  top: size.moderateScale(5),
});
export const submitBtnStyle = () => ({
  marginTop: size.moderateScale(25),
  marginHorizontal: size.moderateScale(25),
  // position:'absolute',
  bottom: size.moderateScale(20),
  right: 0,
  left: 0,
});
export const leftView = () => ({
  alignItems: 'center',
  height: size.moderateScale(20),
  width: size.moderateScale(20),
});
export const selectedCourse = () => ({
  // borderWidth:size.moderateScale(1)
  paddingVertical: size.moderateScale(10),
});
export const selectedCourseStyle = () => ({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: size.moderateScale(14),
  borderWidth: size.moderateScale(1),
  backgroundColor: 'white',
  shadowColor: color.black,
  marginTop: 8,
  marginRight: size.moderateScale(12),
  paddingHorizontal: size.moderateScale(12),
  paddingVertical: 8,
  shadowOffset: {
    width: 0,
    height: 1,
  },
  // top:size.moderateScale(100),
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
  elevation: 2,
});
export const textSelectedStyle = () => ({
  fontSize: fontSize.tiny,
  fontFamily: fonts.poppinsSemiBold,
  color: color.black,
});
// export const dropdown = () => ({
//   alignItems: 'center',
// });
export const selectedItemStyle = () => ({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: size.moderateScale(30),
  backgroundColor: color.white,
  marginHorizontal: size.moderateScale(12),
  paddingHorizontal: size.moderateScale(12),
  paddingVertical: size.moderateScale(3),
  borderWidth: size.moderateScale(0),
  marginTop: size.moderateScale(5),
});
export const backDropImage = () => ({
  position: 'absolute',
  top: size.deviceHeight * 0.3,
  left: size.deviceWidth / 4.5,
  opacity: size.moderateScale(0.05),
  height: size.moderateScale(450),
  width: size.moderateScale(200),
  zIndex: 1,
});
export const checkBox = layout => ({
  height: size.moderateScale(20),
  width: size.moderateScale(20),
  borderRadius: size.moderateScale(5),
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: size.moderateScale(1),
  marginRight: layout ? size.moderateScale(5) : 0,
});
export const checkBoxContainer = () => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  paddingVertical: size.moderateScale(10),
  backgroundColor: color.white,
});
export const checkBoxView = () => ({
  flexDirection: 'row',
  alignItems: 'center',
  marginRight: size.moderateScale(10),
  marginBottom: size.moderateScale(10),
});
export const courseNameText = () => ({
  fontSize: fontSize.small,
  fontFamily: fonts.poppinsMedium,
  color: color.black,
});
export const checkImage = () => ({
  height: size.moderateScale(18),
  width: size.moderateScale(18),
  position: 'absolute',
  bottom: size.moderateScale(3),
  left: size.moderateScale(3),
  zIndex: size.moderateScale(1),
});
export const headingText = () => ({
  fontSize: fontSize.small,
  fontFamily: fonts.poppinsMedium,
  color: color.primary,
  marginVertical: size.moderateScale(5),
});

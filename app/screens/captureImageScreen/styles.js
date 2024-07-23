import { StyleSheet } from "react-native";
import { color, fonts, fontSize, size } from "../../theme";

export const mainView = () => ({
  flex: 1,
  backgroundColor: color.primary
})

export const topView = () => ({
  zIndex: 1
})

export const header = () => ({
  paddingHorizontal: size.moderateScale(16)
})

export const middleView = () => ({
})

export const cameraView = () => ({
  flex: 1,
})

export const noCamera = () => ({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
})

export const noCameraText = () => ({
  fontFamily: fonts.metropolisMedium,
  fontSize: fontSize.middleSmallMedium,
  color: color.mostlyBlack,
})

export const photoTakenOverlay = () => ({
  ...StyleSheet.absoluteFillObject,
    backgroundColor: color.customWhite(0.7),
    justifyContent: 'center',
    alignItems: 'center',
})

export const cameraPermissionText = () => ({
  fontFamily: fonts.metropolisSemiBold,
  fontSize: fontSize.middleSmallMedium,
  color: color.secondary,
  marginTop: size.moderateScale(15)
})

export const capturedImageView = () => ({
  
})
export const capturedImage = () => ({
  width: size.deviceWidth,
  height: size.deviceHeight
})

export const bottomView = () => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  width: '100%',
  backgroundColor: color.primary,
  paddingTop: size.moderateScale(20),
  paddingBottom: size.moderateScale(30),
  justifyContent: 'center',
  alignItems: 'center',
  gap: size.moderateScale(15)
})

export const togglePhotoVideoView = () => ({
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  gap: size.moderateScale(10),
})

export const togglePhotoText = (isVideoMode) => ({
  color: color.mostlyBlack,
  fontFamily: fonts.metropolisRegular,
  backgroundColor: isVideoMode ? color.customBlack(0.2) : color.primary,
  paddingHorizontal: size.moderateScale(8),
  paddingVertical: size.moderateScale(5),
  borderRadius: size.moderateScale(10)
})

export const toggleVideoText = (isVideoMode) => ({
  color: color.mostlyBlack,
  fontFamily: fonts.metropolisRegular,
  backgroundColor: isVideoMode ? color.customBlack(0.2) : color.primary,
  paddingHorizontal: size.moderateScale(8),
  paddingVertical: size.moderateScale(5),
  borderRadius: size.moderateScale(10)
})

export const cameraButtonView = () => ({
  justifyContent: 'space-between',
  flexDirection: 'row',
  width: '100%',
  paddingHorizontal: size.moderateScale(20)
})

export const cameraButton = () => ({
  backgroundColor: color.secondary,
  justifyContent: 'center',
  alignItems: 'center',
  width: size.moderateScale(52),
  height: size.moderateScale(52),
  borderRadius: size.moderateScale(30)
})


export const capturedMediaThumNail = () => ({
  width: size.moderateScale(52),
  height: size.moderateScale(52),
  borderRadius: size.moderateScale(10)
})

export const noMedia = () => ({
  width: size.moderateScale(52),
  height: size.moderateScale(52),
  borderRadius: size.moderateScale(10),
  backgroundColor: color.customBlack(0.5),
  justifyContent: 'center',
  alignItems: 'center', 
})

export const thumNail = () => ({
  width: size.moderateScale(52),
  height: size.moderateScale(52),
})

export const cameraReverse = () => ({
  width: size.moderateScale(52),
  height: size.moderateScale(52),
  justifyContent: 'center',
  alignItems: 'center', 
})

export const cameraIconsView = () => ({
  position: 'absolute',
  top: size.moderateScale(100),
  right: size.moderateScale(10),
  gap: size.moderateScale(20),
})

export const cameraFlash = () => ({
  justifyContent: 'center',
  alignItems: 'center',
  width: size.moderateScale(30),
  height: size.moderateScale(30),
  backgroundColor: color.customWhite(0.6),
  borderRadius: size.moderateScale(15)
})

export const imageScrollView = () => ({
  flex: 1, 
  backgroundColor: color.mostlyBlack,
  // paddingHorizontal: size.moderateScale(5),
})

export const fullImage = () => ({
  width: size.deviceWidth, 
  height: size.deviceHeight, 
  resizeMode: 'cover',
  // marginHorizontal: size.moderateScale(5)
})
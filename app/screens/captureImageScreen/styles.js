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
  paddingTop: size.moderateScale(10),
  paddingBottom: size.moderateScale(43),
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  gap: size.moderateScale(45),
})

export const cameraButton = () => ({
  backgroundColor: color.secondary,
  justifyContent: 'center',
  alignItems: 'center',
  width: size.moderateScale(52),
  height: size.moderateScale(52),
  borderRadius: size.moderateScale(30)
})

export const cameraButtonIcons = (flash) => ({
  justifyContent: 'center',
  alignItems: 'center',
  width: size.moderateScale(24),
  height: size.moderateScale(24),
  backgroundColor: flash ? color.error : color.primary
})
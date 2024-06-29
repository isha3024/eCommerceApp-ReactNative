import { StyleSheet } from "react-native"
import { color, size } from "../../theme"

export const overlay = () => ({
  ...StyleSheet.absoluteFillObject,
  backgroundColor: color.customTransparent(0.5),
  zIndex: 1,
})

export const contentContainer = () => ({
  flex: 1,
})

export const handleComponent = () => ({
    alignItems: 'center',
    paddingVertical: size.moderateScale(10),
    marginBottom: size.moderateScale(16)
})

export const handle = () => ({
  width: size.moderateScale(60),
  height: size.moderateScale(6),
  borderRadius: size.moderateScale(3),
  backgroundColor: color.darkGray
})
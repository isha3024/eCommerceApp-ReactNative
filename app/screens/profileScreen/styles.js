import {color, fontSize, fonts, size} from '../../theme';

export const mainContainer = () => ({
  flex: 1,
  backgroundColor: color.primary,
});

export const header = () => ({
  paddingHorizontal: size.moderateScale(14)
});

export const profileContainer = () => ({
  flex: 1,
  paddingVertical: size.moderateScale(18)
});

export const mainTitle = () => ({
  fontSize: fontSize.middleLarge,
  fontFamily: fonts.metropolisBold,
  color: color.mostlyBlack,
  paddingHorizontal: size.moderateScale(14)
});

export const profileInfo = () => ({
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: size.moderateScale(18),
  marginTop: size.moderateScale(24),
  paddingHorizontal: size.moderateScale(14)
});

export const profileImgView = () => ({
  width: size.moderateScale(64),
  height: size.moderateScale(64),
  borderRadius: size.moderateScale(40),
  overflow: 'hidden'
});

export const profileImg = () => ({
  width: '100%',
  height: '100%',
});

export const profileName = () => ({
  fontSize: fontSize.middleMedium,
  fontFamily: fonts.metropolisSemiBold,
  color: color.mostlyBlack,
  marginTop: size.moderateScale(3)
});

export const profileEmail = () => ({
  fontSize: fontSize.small,
  fontFamily: fonts.metropolisMedium,
  color: color.darkGray,
  marginTop: size.moderateScale(3)
});

export const profileOptionsList = () => ({
  marginTop: size.moderateScale(28)
});

export const profileOptionItem = () => ({
  paddingVertical: size.moderateScale(18),
  paddingHorizontal: size.moderateScale(16),
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottomColor: color.borderColor,
  borderBottomWidth: size.moderateScale(1),
});

export const profileOptionItemLast = () => ({
  borderBottomWidth: size.moderateScale(0),
});

export const profileOptionTitle = () => ({
  fontSize: fontSize.littleMedium,
  fontFamily: fonts.metropolisSemiBold,
  color: color.mostlyBlack,
});

export const message = () => ({
  marginTop: size.moderateScale(10),
  fontSize: fontSize.mediumSmall,
  fontFamily: fonts.metropolisRegular,
  color: color.darkGray,
});

export const forwardArrow = () => ({
  transform: [{rotate: '180deg'}],
})
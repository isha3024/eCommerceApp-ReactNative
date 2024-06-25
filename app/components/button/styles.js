import {color, fonts, fontSize, size} from '../../theme';

export const btnContainer = (isDisabled, btnBorder) => ({
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: size.moderateScale(12),
  backgroundColor: isDisabled ? color.darkGray : btnBorder ? 'transparent' : color.secondary,
  elevation: size.moderateScale(2),
  paddingVertical: size.moderateScale(15),
  borderRadius: size.moderateScale(25),
  flexDirection: 'row',
  alignItems: 'center',
  gap: size.moderateScale(9),
  borderWidth: size.moderateScale(1),
  borderColor: btnBorder ? color.veryDarkGray : color.transparent,
  elevation: btnBorder ? size.moderateScale(0) : size.moderateScale(3)
}); 

export const btnBorder = () => ({
  borderWidth: 1,
  borderColor: color.veryDarkGray,
  backgroundColor : 'transparent',
  elevation: 0
})

export const titleStyle = () => ({
  fontSize: fontSize.small,
  color: color.white,
  fontFamily: fonts.metropolisMedium,
});

export const titleStyle2 = () => ({
  fontSize: fontSize.small,
  color: color.veryDarkGray,
  fontFamily: fonts.metropolisMedium,
});


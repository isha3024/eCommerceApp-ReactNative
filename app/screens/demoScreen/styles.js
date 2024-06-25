import {color, size} from '../../theme';

export const mainView = statusbarHeight => ({
  flex: 1,
  backgroundColor: color.primary,
  // gap: 20,
  marginTop: statusbarHeight,
  paddingTop: size.moderateScale(200),
  paddingHorizontal: size.moderateScale(10)
});
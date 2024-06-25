import {color, size} from '../../theme';

export const rootContainer = () => ({
  flex: 1,
  backgroundColor: color.primary,
  justifyContent: 'center',
  alignItems: 'center',
});
export const appLogo = () => ({
  alignSelf: 'center',
  height: size.moderateScale(150),
  width: size.moderateScale(150),
});

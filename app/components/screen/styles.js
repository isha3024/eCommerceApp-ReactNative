import {color} from '../../theme';
export const full = () => ({
  flexGrow: 1,
});
export const mainContainer = secondary => ({
  flex: 1,
  backgroundColor: secondary ? color.primary : color.primary,
});
export const container = (style, secondary) => [
  {
    flex: 1,
    backgroundColor: secondary ? secondary : color.primary,
    overflow: 'hidden',
  },
  style,
];

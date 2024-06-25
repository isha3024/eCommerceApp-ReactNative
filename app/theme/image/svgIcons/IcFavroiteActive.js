import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { color } from '../../Colors';

export const FavoriteActive = props => (
  <Svg
    width={27}
    height={24}
    viewBox="0 0 27 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.079 24l-1.896-1.726C4.447 16.166 0 12.137 0 7.194 0 3.164 3.165 0 7.193 0c2.276 0 4.46 1.06 5.886 2.734C14.505 1.059 16.689 0 18.965 0c4.028 0 7.193 3.165 7.193 7.193 0 4.944-4.447 8.973-11.183 15.094L13.08 24z"
      fill={props.fill ?? color.secondary}
    />
  </Svg>
);



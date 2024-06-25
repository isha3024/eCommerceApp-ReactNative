import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { color } from '../../Colors';

export const HomeInactive = props => (
  <Svg
    width={props.width ?? 30}
    height={props.height ?? 26}
    viewBox="0 0 30 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      clipRule="evenodd"
      d="M12.294 25v-8.47h5.647V25H25V13.706h4.235L15.118 1 1 13.706h4.235V25h7.06z"
      stroke={props.stroke ?? color.darkGray}
    />
  </Svg>
);



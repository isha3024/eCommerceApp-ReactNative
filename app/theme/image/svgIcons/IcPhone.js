import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {size} from '../../Size';
import {color} from '../../Colors';

export const Phone = props => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? size.moderateScale(20)}
      height={props.height ?? size.moderateScale(30)}
      viewBox="0 0 14 20"
      fill="none">
      <Path
        d="M6 2H8M7 15V15.01M1 3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H11C11.5304 1 12.0391 1.21071 12.4142 1.58579C12.7893 1.96086 13 2.46957 13 3V17C13 17.5304 12.7893 18.0391 12.4142 18.4142C12.0391 18.7893 11.5304 19 11 19H3C2.46957 19 1.96086 18.7893 1.58579 18.4142C1.21071 18.0391 1 17.5304 1 17V3Z"
        stroke={props.stroke ?? color.primary}
        stroke-width={size.moderateScale(10)}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

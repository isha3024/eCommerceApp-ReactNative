import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {color} from '../../Colors';
import {size} from '../../Size';

export const Check = props => {
  return (
    <Svg
      width={props.width ?? size.moderateScale(18)}
      height={props.height ?? size.moderateScale(14)}
      viewBox="0 0 18 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M5.59 10.58L1.42 6.41 0 7.82l5.59 5.59 12-12L16.18 0 5.59 10.58z"
        fill={props.fill ?? color.success}
      />
    </Svg>
  );
};

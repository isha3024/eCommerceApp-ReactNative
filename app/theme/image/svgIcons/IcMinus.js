import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {size} from '../../Size';
import { color } from '../../Colors';

export const Minus = props => (
  <Svg
      width={props.width ?? size.moderateScale(14)}
      height={props.height ?? size.moderateScale(2)}
      viewBox="0 0 14 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path fill="#9B9B9B" d="M0 0H14V2H0z" />
    </Svg>
);

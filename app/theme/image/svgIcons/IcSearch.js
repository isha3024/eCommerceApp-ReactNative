import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {size} from '../../Size';
import {color} from '../../Colors';

export const Search = props => (
  <Svg
   width={props.width ?? 19}
   height={props.height ?? 16}
  viewBox="0 0 19 16"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  {...props}
>
  <Path
    d="M6.038 12.623L1.534 7.648 0 9.33 6.038 16 19 1.682 17.477 0 6.038 12.623z"
    fill={props.fill ?? color.success}
  />
</Svg>
);
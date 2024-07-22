import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {color} from '../../Colors';

export const Camera = props => (
  <Svg
      width={props.width ?? 22}
      height={props.height ?? 20}
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M7.75.167L5.767 2.333H2.333A2.173 2.173 0 00.167 4.5v13c0 1.192.975 2.167 2.166 2.167h17.334a2.173 2.173 0 002.166-2.167v-13a2.173 2.173 0 00-2.166-2.167h-3.434L14.25.167h-6.5zM11 16.417A5.419 5.419 0 015.583 11 5.419 5.419 0 0111 5.583 5.419 5.419 0 0116.417 11 5.419 5.419 0 0111 16.417z"
        fill={props.fill ?? color.white}
      />
    </Svg>
);
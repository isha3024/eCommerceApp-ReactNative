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
      <Path d="M11 15a4 4 0 100-8 4 4 0 000 8z" fill={props.fill ?? color.white} />
      <Path
        d="M7.583 0L5.601 2.167H2.167A2.173 2.173 0 000 4.333v13C0 18.525.975 19.5 2.167 19.5H19.5a2.173 2.173 0 002.167-2.167v-13A2.173 2.173 0 0019.5 2.167h-3.434L14.083 0h-6.5zm3.25 16.25a5.419 5.419 0 01-5.416-5.417 5.419 5.419 0 015.416-5.416 5.419 5.419 0 015.417 5.416 5.419 5.419 0 01-5.417 5.417z"
        fill={props.fill ?? color.white}
      />
    </Svg>
);
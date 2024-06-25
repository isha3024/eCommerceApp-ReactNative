import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {size} from '../../Size';
import {color} from '../../Colors';

export const Facebook = props => (
  <Svg
      width={props.width ?? 24}
      height={props.height ?? 24}
      viewBox="0 0 24 24"
      fill={props.fill ?? 'none'}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M24 22.5a1.5 1.5 0 01-1.5 1.5h-21A1.5 1.5 0 010 22.5v-21A1.5 1.5 0 011.5 0h21A1.5 1.5 0 0124 1.5v21z"
        fill="#3B5998"
      />
      <Path
        d="M16.5 24v-9h3l.75-3.75H16.5v-1.5c0-1.5.752-2.25 2.25-2.25h1.5V3.75h-3c-2.756 0-4.5 2.16-4.5 5.25v2.25h-3V15h3v9h3.75z"
        fill="#fff"
      />
    </Svg>
);
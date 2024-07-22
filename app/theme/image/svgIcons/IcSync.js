import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

import {color} from '../../Colors';

export const Sync = props => (
  <Svg
      width={props.width ?? 16}
      height={props.height ?? 22}
      viewBox="0 0 16 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M8 3V0L4 4l4 4V5c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0016 11c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L1.24 6.74A7.93 7.93 0 000 11c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"
        fill={props.fill ?? color.mostlyBlack}
      />
    </Svg>
);

      
      
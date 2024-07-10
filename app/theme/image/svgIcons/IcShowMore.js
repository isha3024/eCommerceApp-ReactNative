import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {color} from '../../Colors';

export const ShowMore = props => (
  <Svg
      width={props.width ?? 4}
      height={props.width ?? 16}
      viewBox="0 0 4 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        opacity={0.54}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2C.9 6 0 6.9 0 8s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
        fill={props.fill ?? color.darkGray}
      />
    </Svg>
);

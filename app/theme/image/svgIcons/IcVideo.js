import * as React from 'react';
import Svg, {Circle} from 'react-native-svg';
import {color} from '../../Colors';

export const Video = props => (
  <Svg
      width={props.width ?? 53}
      height={props.height ?? 53}
      viewBox="0 0 53 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle
        cx={26.7698}
        cy={26.2107}
        r={24.5}
        fill={props.fill ?? color.darkGray}
        stroke={props.stroke ?? color.secondary}
        strokeWidth={props.strokeWidth ?? 3}
      />
    </Svg>
);
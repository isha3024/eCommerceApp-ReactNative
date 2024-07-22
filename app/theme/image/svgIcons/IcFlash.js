import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

import {color} from '../../Colors';

export const Flash = props => (
  <Svg
      width={props.width ?? 10}
      height={props.height ?? 20}
      viewBox="0 0 10 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M0 0v11h3v9l7-12H6l4-8H0z" fill={props.fill ?? color.mostlyBlack} />
    </Svg>
);
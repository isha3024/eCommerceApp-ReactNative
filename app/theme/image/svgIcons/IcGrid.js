import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {size} from '../../Size';
import {color} from '../../Colors';

export const Grid = props => (
  <Svg
      width={props.width ?? 16}
      height={props.height ?? 12}
      viewBox="0 0 16 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 5.53846H4.70588V0H0V5.53846ZM0 12H4.70588V6.46154H0V12ZM5.64703 12H10.3529V6.46154H5.64703V12ZM11.2941 12H16V6.46154H11.2941V12ZM5.64706 5.53846H10.3529V0H5.64706V5.53846ZM11.2941 0V5.53846H16V0H11.2941Z"
        fill={props.fill ?? color.mostlyBlack}
      />
    </Svg>
);
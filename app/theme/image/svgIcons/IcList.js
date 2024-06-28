import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { color } from '../../Colors';

export const List = props => (
  <Svg
      width={props.width ?? 17}
      height={props.height ?? 14}
      viewBox="0 0 17 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 9h4V5H0v4zm0 5h4v-4H0v4zM0 4h4V0H0v4zm5 5h12V5H5v4zm0 5h12v-4H5v4zM5 0v4h12V0H5z"
        fill={props.fill ?? color.mostlyBlack}
      />
    </Svg>
);



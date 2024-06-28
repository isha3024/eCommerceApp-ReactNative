import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {size} from '../../Size';
import {color} from '../../Colors';

export const Filter = props => (
  <Svg
    width={props.width ?? 18}
    height={props.height ?? 12}
    viewBox="0 0 18 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path d="M7 12h4v-2H7v2zM0 0v2h18V0H0zm3 7h12V5H3v2z" 
    fill={props.fill ?? color.mostlyBlack} />
  </Svg>
);
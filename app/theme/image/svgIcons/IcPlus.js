import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {size} from '../../Size';
import { color } from '../../Colors';

export const Plus = props => (
  <Svg
      width={props.width ?? size.moderateScale(14)}
      height={props.height ?? size.moderateScale(14)}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 0v6H0v2h6v6h2V8h6V6H8V0H6z"
        fill={props.fill ?? color.white}
      />
    </Svg>
);

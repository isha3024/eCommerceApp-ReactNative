import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {size} from '../../Size';
import { color } from '../../Colors';

export const ChevronRight = props => (
  <Svg
      width={props.width ?? size.moderateScale(12)}
      height={props.height ?? size.moderateScale(12)}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 0L4.95 1.05l4.2 4.2H0v1.5h9.15l-4.2 4.2L6 12l6-6-6-6z"
        fill={props.fill ?? color.white}
      />
    </Svg>
);


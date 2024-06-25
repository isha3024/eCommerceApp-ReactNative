import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {color} from '../../Colors';

export const Star = props => (
  <Svg
      width={props.width ?? 12}
      height={props.width ?? 12}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 9.95l-3.123 1.594a.5.5 0 01-.72-.533l.593-3.353L.254 5.297a.5.5 0 01.274-.858L3.99 3.95 5.554.876a.5.5 0 01.892 0L8.009 3.95l3.463.489a.5.5 0 01.274.858L9.25 7.658l.592 3.353a.5.5 0 01-.72.533L6 9.95z"
        fill={props.fill ?? color.transparent}
        stroke={props.stroke ?? color.transparent}
      />
    </Svg>
);
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {size} from '../../Size';
import {color} from '../../Colors';

export const Pen = props => (
  <Svg
      width={props.width ?? 13}
      height={props.height ?? 13}
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 10.292V13h2.708l7.987-7.987-2.708-2.708L0 10.292zm12.789-7.373a.72.72 0 000-1.018L11.099.21a.72.72 0 00-1.018 0L8.759 1.533l2.708 2.708 1.322-1.322z"
        fill={props.fill ?? color.white}
      />
    </Svg>
);
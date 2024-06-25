import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {color} from '../../Colors';

export const Favorite = props => (
  <Svg
      width={props.width ?? 30}
      height={props.height ?? 26}
      viewBox="0 0 28 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        clipRule="evenodd"
        d="M14.079 25l-1.896-1.726C5.447 17.166 1 13.137 1 8.194 1 4.164 4.165 1 8.193 1c2.276 0 4.46 1.06 5.886 2.734C15.505 2.059 17.689 1 19.965 1c4.028 0 7.193 3.165 7.193 7.193 0 4.944-4.447 8.973-11.183 15.094L14.08 25z"
        stroke={props.stroke ?? color.darkGray}
      />
    </Svg>
);


      
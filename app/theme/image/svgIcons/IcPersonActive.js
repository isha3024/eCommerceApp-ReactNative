import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {color} from '../../Colors';

export const PersonActive = props => (
  <Svg
       width={props.width ?? 30}
       height={props.height ?? 26}
      viewBox="0 0 21 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.14 0a5.064 5.064 0 015.071 5.07 5.064 5.064 0 01-5.07 5.07 5.064 5.064 0 01-5.07-5.07A5.064 5.064 0 0110.14 0zm0 24A12.17 12.17 0 010 18.558c.05-3.364 6.76-5.206 10.14-5.206 3.364 0 10.091 1.842 10.142 5.206A12.17 12.17 0 0110.14 24z"
        fill={props.fill ?? color.secondary}
      />
    </Svg>
);
      
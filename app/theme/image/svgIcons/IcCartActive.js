import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {color} from '../../Colors';

export const CartActive = props => (
  <Svg
     width={props.width ?? 30}
     height={props.height ?? 26}
      viewBox="0 0 24 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M23.953 20.466L22 2.09C22 .936 21.105 0 20 0H4C2.895 0 2 .936 2 2.09L.047 20.467c-.029.143-.047.29-.047.443C0 22.064.895 23 2 23h20c1.105 0 2-.936 2-2.09 0-.154-.018-.301-.047-.444zM17 5.13v1.142c0 2.882-2.243 5.227-5 5.227S7 9.155 7 6.273V5.13A1.56 1.56 0 016 3.66c0-.866.672-1.568 1.5-1.568S9 2.793 9 3.659v2.614c0 1.729 1.346 3.136 3 3.136s3-1.407 3-3.136V3.659c0-.866.672-1.568 1.5-1.568s1.5.702 1.5 1.568a1.56 1.56 0 01-1 1.472z"
        fill={props.fill ?? color.secondary}
      />
    </Svg>
);
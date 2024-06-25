import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {color} from '../../Colors';
import {size} from '../../Size';
export const Home = props => {
  return (
    <Svg
      width={props.width ?? size.moderateScale(19)}
      height={props.height ?? size.moderateScale(15)}
      viewBox="0 0 19 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M7.492 14.568V9.426h3.746v5.142h4.682V7.713h2.81L9.365 0 0 7.713h2.81v6.855h4.682z"
        fill={props.fill ?? color.black}
      />
    </Svg>
  );
};

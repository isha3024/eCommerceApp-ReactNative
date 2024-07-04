import * as React from 'react';
import Svg, { Circle, G, Path, Defs, ClipPath } from "react-native-svg"
import { color } from '../../Colors';

export const Camera = props => {
  return (
    <Svg
      width={props.width ?? 52}
      height={props.height ?? 52}
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={26} cy={26} r={26} fill={color.secondary} />
      <G clipPath="url(#clip0_2_967)" fill={color.white}>
        <Path d="M26 29.467a3.467 3.467 0 100-6.934 3.467 3.467 0 000 6.934z" />
        <Path d="M22.75 15.167l-1.983 2.166h-3.434a2.173 2.173 0 00-2.166 2.167v13c0 1.192.975 2.167 2.166 2.167h17.334a2.173 2.173 0 002.166-2.167v-13a2.173 2.173 0 00-2.166-2.167h-3.434l-1.983-2.166h-6.5zM26 31.417A5.419 5.419 0 0120.583 26 5.419 5.419 0 0126 20.583 5.419 5.419 0 0131.417 26 5.419 5.419 0 0126 31.417z" />
      </G>
      <Defs>
        <ClipPath id="clip0_2_967">
          <Path fill={color.white} transform="translate(13 13)" d="M0 0H26V26H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const Share = props => {
  return (
    <Svg
      width={props.width ?? 20}
      height={props.height ?? 18}
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M11 1v4C4.425 6.028 1.98 11.788 1 17c-.037.206 5.384-5.962 10-6v4l8-7-8-7z"
        stroke={props.stroke ?? '#354052'}
        strokeWidth={props.strokeWidth ?? 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

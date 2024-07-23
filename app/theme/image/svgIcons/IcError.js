import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import { color } from '../../Colors';
import { size } from '../../Size';

export const Error = props => (
  <Svg
      width={props.width ?? size.moderateScale(35)}
      height={props.height ?? size.moderateScale(35)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G
        stroke={props.stroke ?? color.darkGray}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M2.202 18.47l7.962-14.465c.738-1.34 2.934-1.34 3.672 0l7.962 14.465c.646 1.173-.338 2.53-1.835 2.53H4.037c-1.497 0-2.481-1.357-1.835-2.53zM12 9v4M12 17.02V17" />
      </G>
    </Svg>
);
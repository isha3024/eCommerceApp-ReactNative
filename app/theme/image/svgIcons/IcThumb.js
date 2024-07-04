import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {color} from '../../Colors';

export const Thumb = props => (
  <Svg
    width={props.width ?? 13}
    height={props.height ?? 14}
    viewBox="0 0 13 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 13.36h2.364v-7.8H0v7.8zm13-7.15c0-.716-.532-1.3-1.182-1.3H8.09l.56-2.971.019-.208c0-.267-.1-.514-.26-.69L7.782.36 3.894 4.643a1.337 1.337 0 00-.349.916v6.5c0 .715.532 1.3 1.182 1.3h5.319c.49 0 .91-.325 1.087-.793l1.784-4.582c.053-.15.083-.306.083-.475V6.268l-.006-.007L13 6.21z"
      fill={props.fill ?? color.darkGray}
    />
  </Svg>
);
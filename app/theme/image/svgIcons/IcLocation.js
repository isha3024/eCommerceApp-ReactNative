import * as React from 'react';
import Svg, { Circle, G, Path } from 'react-native-svg';
import { color } from '../../Colors';
import { size } from '../../Size';

export const LocationPin = props => (
  <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size.moderateScale(40)}
      height={size.moderateScale(40)}
      viewBox="0 0 64 64"
      xmlSpace="preserve"
      {...props}
    >
      <Path
        fill={color.secondary}
        d="M32 52.789l-12-18C18.5 32 16 28.031 16 24c0-8.836 7.164-16 16-16s16 7.164 16 16c0 4.031-2.055 8-4 10.789l-12 18z"
      />
      <G fill={color.mostlyBlack}>
        <Path d="M32 0C18.746 0 8 10.746 8 24c0 5.219 1.711 10.008 4.555 13.93.051.094.059.199.117.289l16 24a4.001 4.001 0 006.656 0l16-24c.059-.09.066-.195.117-.289C54.289 34.008 56 29.219 56 24 56 10.746 45.254 0 32 0zm12 34.789l-12 18-12-18C18.5 32 16 28.031 16 24c0-8.836 7.164-16 16-16s16 7.164 16 16c0 4.031-2.055 8-4 10.789z" />
        <Circle cx={32} cy={24} r={8} />
      </G>
    </Svg>
);



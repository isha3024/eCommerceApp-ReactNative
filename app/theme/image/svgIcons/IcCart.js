import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {color} from '../../Colors';

export const Cart = props => (
  <Svg
      width={props.width ?? 30}
      height={props.height ?? 26}
      viewBox="0 0 24 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M23.456 20.519l.002.023.005.023c.024.117.037.231.037.344 0 .9-.692 1.591-1.5 1.591H2c-.808 0-1.5-.69-1.5-1.59 0-.114.013-.228.037-.345l.005-.023.002-.023L2.497 2.144l.003-.027v-.026C2.5 1.19 3.192.5 4 .5h16c.808 0 1.5.69 1.5 1.59v.027l.003.027 1.953 18.375zM17.5 6.273v-.83c.6-.358 1-1.025 1-1.784 0-1.12-.875-2.068-2-2.068s-2 .947-2 2.068v2.614c0 1.474-1.143 2.636-2.5 2.636S9.5 7.747 9.5 6.273V3.659c0-1.12-.875-2.068-2-2.068s-2 .947-2 2.068c0 .76.4 1.426 1 1.785v.829C6.5 9.41 8.946 12 12 12s5.5-2.59 5.5-5.727z"
        stroke={props.stroke ?? color.darkGray}
      />
    </Svg>
);
import React from 'react'
import { Text } from '../text'

import * as styles from './styles'

export const Title = ({
  title,
  customStyles,
  ...props
}) => {
  return (
    <Text
      style={[customStyles, styles.title()]}
      {...props}>
      {title}
    </Text>
  )
}

export default Title
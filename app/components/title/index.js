import React from 'react'
import { Text } from '../text'

import * as styles from './styles'

const Title = ({
  title,
  customStyles,
  ...props
}) => {
  return (
    <Text
      style={[styles.title(), customStyles]}
      {...props}>
      {title}
    </Text>
  )
}

export default Title
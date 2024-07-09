import React from 'react'
import { View } from 'react-native'
import { Button, Header, InputField, Text } from '../../components'

import * as styles from './styles'
import { IcBackArrow, IcForwardArrow, size } from '../../theme'
import { useNavigation } from '@react-navigation/native'

export const AddNewAddressScreen = () => {

  const navigation = useNavigation()

  return (
    <View style={styles.mainView()}>
      <View style={styles.topView()}>
        <Header 
          headerStyle={styles.header()}
          title
          headerTitle='Adding Shipping Address'
          headerLeftIcon
          leftIcon={() => {
            return (<IcBackArrow />)
          }}
          leftIconPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.middleView()}>
        <InputField 
          placeholder='Full name'
          label='Full name'
          autoCapitalize={true}
          keyboardType='default'
        />
        <InputField 
          placeholder='Address'
          label='Address'
          autoCapitalize={true}
          keyboardType='default'
        />
        <InputField 
          placeholder='City'
          label='City'
          autoCapitalize={true}
          keyboardType='default'
        />
        <InputField 
          placeholder='State/Province/Region'
          label='State/Province/Region'
          autoCapitalize={true}
          keyboardType='default'
        />
        <InputField 
          placeholder='Zip Code (Postal Code)'
          label='Zip Code (Postal Code)'
          maxLength={6}
          autoCapitalize={true}
          keyboardType='numeric'
        />
        <InputField 
          placeholder='Country'
          label='Country'
          autoCapitalize={true}
          keyboardType='default'
          icon
          iconPlace='right'
          renderRightIcon={() => (<IcBackArrow width={size.moderateScale(10)} height={size.moderateScale(8)} style={styles.backArrow()} />)}
        />
        <Button 
          title='SAVE ADDRESS'
          btnStyle={styles.button()}
        />
      </View>
    </View>
  )
}

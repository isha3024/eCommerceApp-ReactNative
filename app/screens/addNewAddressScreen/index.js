import React, { useState } from 'react'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


import { Button, Header, InputField, Screen } from '../../components'
import { color, IcBackArrow, size } from '../../theme'
import * as styles from './styles'

export const AddNewAddressScreen = ({route}) => {

  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [addressLineOne, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');


  const addNewAddress = () => {
    navigation.goBack();
  };

  return (
    <Screen bgColor={color.primary} translucent={true} style={styles.mainView()}>
    <KeyboardAwareScrollView keyboardShouldPersistTaps='always'>
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
          value={name}
          onChangeText={text => setName(text)}
          autoCapitalize={true}
          keyboardType='default'
        />
        <InputField 
          placeholder='Address'
          label='Address'
          value={addressLineOne}
          onChangeText={(val) => setAddress(val)}
          autoCapitalize={true}
          keyboardType='default'
        />
        <InputField 
          placeholder='City'
          label='City'
          value={city}
          onChangeText={(val) => setCity(val)}
          autoCapitalize={true}
          keyboardType='default'
        />
        <InputField 
          placeholder='State/Province/Region'
          label='State/Province/Region'
          value={province}
          onChangeText={(val) => setProvince(val)}
          autoCapitalize={true}
          keyboardType='default'
        />
        <InputField 
          placeholder='Zip Code (Postal Code)'
          label='Zip Code (Postal Code)'
          maxLength={6}
          value={zipCode}
          onChangeText={(val) => setZipCode(val)}
          autoCapitalize={true}
          keyboardType='numeric'
        />
        <InputField 
          placeholder='Country'
          label='Country'
          value={country}
          onChangeText={(val) => setCountry(val)}
          autoCapitalize={true}
          keyboardType='default'
          icon
          iconPlace='right'
          renderRightIcon={() => (<IcBackArrow width={size.moderateScale(10)} height={size.moderateScale(8)} style={styles.backArrow()} />)}
        />
        <Button 
          title='SAVE ADDRESS'
          btnStyle={styles.button()}
          onPress={addNewAddress}
        />
      </View>
    </KeyboardAwareScrollView>
    </Screen>
  )
}

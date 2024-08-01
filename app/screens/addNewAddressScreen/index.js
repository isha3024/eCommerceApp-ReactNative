import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Button, Header, InputField, Screen } from '../../components';
import { color, IcBackArrow, size } from '../../theme';
import * as styles from './styles';

export const AddNewAddressScreen = ({ route }) => {
  const navigation = useNavigation();
  
  // State initialization
  const [name, setName] = useState('');
  const [addressLineOne, setAddressLineOne] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  
  // Fetch and set previous address from route params
  useEffect(() => {
    if (route.params?.address) {
      const address = route.params.address;
      setName(address.name ?? '');
      setAddressLineOne(address.address ?? '');
      setCity(address.city ?? '');
      setProvince(address.province ?? '');
      setZipCode(address.zipCode ?? '');
      setCountry(address.country ?? '');
      console.log('Address from route params:', address);
    }
  }, [route.params]);

  // Log updated newAddress
  useEffect(() => {
    console.log('New Address:', { name, addressLineOne, city, province, zipCode, country });
  }, [name, addressLineOne, city, province, zipCode, country]);

  const addNewAddress = () => {
    if (name && addressLineOne && city && province && zipCode && country) {
      const newAddress = {
        name,
        addressLineOne,
        city,
        province,
        zipCode,
        country,
      };
      navigation.navigate('addressScreen', {newAddress: newAddress});
    } else {
      Alert.alert(
        'All fields are required',
        'Please fill in all fields to add a new address',
        [{ text: 'Ok', onPress: () => null }]
      );
    }
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
            leftIcon={() => (<IcBackArrow />)}
            leftIconPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.middleView()}>
          <InputField 
            placeholder='Full name'
            label='Full name'
            value={name}
            onChangeText={text => setName(text)}
            autoCapitalize='words'
            keyboardType='default'
          />
          <InputField 
            placeholder='Address'
            label='Address'
            value={addressLineOne}
            onChangeText={val => setAddressLineOne(val)}
            autoCapitalize='sentences'
            keyboardType='default'
          />
          <InputField 
            placeholder='City'
            label='City'
            value={city}
            onChangeText={val => setCity(val)}
            autoCapitalize='words'
            keyboardType='default'
          />
          <InputField 
            placeholder='State/Province/Region'
            label='State/Province/Region'
            value={province}
            onChangeText={val => setProvince(val)}
            autoCapitalize='words'
            keyboardType='default'
          />
          <InputField 
            placeholder='Zip Code (Postal Code)'
            label='Zip Code (Postal Code)'
            maxLength={6}
            value={zipCode}
            onChangeText={val => setZipCode(val)}
            autoCapitalize='none'
            keyboardType='numeric'
          />
          <InputField 
            placeholder='Country'
            label='Country'
            value={country}
            onChangeText={val => setCountry(val)}
            autoCapitalize='words'
            keyboardType='default'
            icon
            iconPlace='right'
            renderRightIcon={() => (
              <IcBackArrow width={size.moderateScale(10)} height={size.moderateScale(8)} style={styles.backArrow()} />
            )}
          />
          <Button 
            title='SAVE ADDRESS'
            btnStyle={styles.button()}
            onPress={addNewAddress}
          />
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
};

import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Button, Header, InputField, Screen } from '../../components';
import { useMainContext } from '../../contexts/MainContext';
import { color, IcBackArrow, size } from '../../theme';
import * as styles from './styles';

export const AddNewAddressScreen = ({ route }) => {

  const navigation = useNavigation();
  const { addresses, setAddresses } = useMainContext();
  
  // State initialization
  const [address, setAddress] = useState({
    name: '',
    addressLineOne: '',
    city: '',
    province: '',
    zipCode: '',
    country: ''
  }); 
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    if (isEditing) {
      // Update the existing address
      setAddresses(prevAddresses =>
        prevAddresses.map(addr =>
          addr.id === address.id ? address : addr
        )
      );
    } else {
      // Add a new address
      setAddresses(prevAddresses => [...prevAddresses, { ...address, id: prevAddresses.length + 1 }]);
    }
    navigation.goBack();
  };


  useEffect(() => {
    if (route.params?.editAddress) {
      setAddress(route.params.editAddress);
      setIsEditing(true);
    }
  }, [route.params]);

  return (
    <Screen bgColor={color.primary} translucent={true} style={styles.mainView()}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps='always'>
        <View style={styles.topView()}>
          <Header 
            headerStyle={styles.header()}
            title
            headerTitle={isEditing ? 'Edit Address' : 'Add Shipping Address'}
            headerLeftIcon
            leftIcon={() => (<IcBackArrow />)}
            leftIconPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.middleView()}>
          <InputField 
            placeholder='Full name'
            label='Full name'
            value={address.name}
            onChangeText={text => setAddress(prev => ({ ...prev, name: text }))}
            autoCapitalize='words'
            keyboardType='default'
          />
          <InputField 
            placeholder='Address'
            label='Address'
            value={address.addressLineOne}
            onChangeText={text => setAddress(prev => ({ ...prev, addressLineOne: text }))}
            autoCapitalize='sentences'
            keyboardType='default'
          />
          <InputField 
            placeholder='City'
            label='City'
            value={address.city}
            onChangeText={text => setAddress(prev => ({ ...prev, city: text }))}
            autoCapitalize='words'
            keyboardType='default'
          />
          <InputField 
            placeholder='State/Province/Region'
            label='State/Province/Region'
            value={address.province}
            onChangeText={text => setAddress(prev => ({ ...prev, province: text }))}
            autoCapitalize='words'
            keyboardType='default'
          />
          <InputField 
            placeholder='Zip Code (Postal Code)'
            label='Zip Code (Postal Code)'
            maxLength={6}
            value={address.zipCode}
            onChangeText={text => setAddress(prev => ({ ...prev, zipCode: text }))}
            autoCapitalize='none'
            keyboardType='numeric'
          />
          <InputField 
            placeholder='Country'
            label='Country'
            value={address.country}
            onChangeText={text => setAddress(prev => ({ ...prev, country: text }))}
            autoCapitalize='words'
            keyboardType='default'
            icon
            iconPlace='right'
            renderRightIcon={() => (
              <IcBackArrow width={size.moderateScale(10)} height={size.moderateScale(8)} style={styles.backArrow()} />
            )}
          />
          <Button 
            title={isEditing ? "Update Address" : "Add Address"}
            btnStyle={styles.button()}
            onPress={handleSave}
          />
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
};

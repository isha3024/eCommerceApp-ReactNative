import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, LogBox } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import * as styles from './styles';
import { color, IcBackArrow, IcCheckBoxActive, IcCheckBoxInactive, IcPlus } from '../../theme';
import { Header, Screen } from '../../components';

import * as data from '../../json';
import { useMainContext } from '../../contexts/MainContext';

// Ignore specific warning
LogBox.ignoreLogs([
  'Warning: Cannot update a component (`MainContextProvider`) while rendering a different component (`AddressScreen`).'
]);

const customerAddress = data.addressList;

export const AddressScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [addresses, setAddresses] = useState(customerAddress);
  const [checkboxFilled, setCheckboxFilled] = useState({ [customerAddress[0].id]: true });

  const { selectedAddress, setSelectedAddress } = useMainContext();

  // Add new address if provided in route.params
  useEffect(() => {
    if (route.params?.address) {
      const newAddress = route.params.address;
      setAddresses(prevAddresses => [...prevAddresses, newAddress]);
      console.log('New address added:', newAddress);
    }
  }, [route.params]);

  // Update selected address context when selected address changes
  useEffect(() => {
    if (selectedAddress) {
      setSelectedAddress(selectedAddress);
    }
  }, [selectedAddress]);

  const toggleCheckbox = (id) => {
    setCheckboxFilled(prev => {
      const newCheckBoxState = {};
      let isOnlySelected = true;
      addresses.forEach(address => {
        if (address.id !== id && prev[address.id]) {
          isOnlySelected = false;
        }
        newCheckBoxState[address.id] = address.id === id ? !prev[id] : false;
      });

      if (isOnlySelected && prev[id]) {
        newCheckBoxState[id] = true;
      }

      const selected = addresses.find(address => address.id === id && newCheckBoxState[id]);
      if (selected) {
        setSelectedAddress(selected);
      } else {
        setSelectedAddress(addresses[0]);
      }

      return newCheckBoxState;
    });
  };

  return (
    <View style={styles.mainView()}>
      <StatusBar backgroundColor={color.primary} translucent />
      <View style={styles.topView()}>
        <Header
          headerStyle={styles.header()}
          title
          headerTitle='Shipping Addresses'
          headerLeftIcon
          leftIcon={() => <IcBackArrow />}
          leftIconPress={() => navigation.goBack()}
        />
      </View>
      <Screen withScroll bgColor={color.primary} style={styles.middleView()}>
        <View style={styles.addressCardList()}>
          {addresses.map((address) => (
            <View key={address.id} style={styles.addressCard()}>
              <View style={styles.userNameView()}>
                <Text style={styles.userName()}>{address.name}</Text>
                <TouchableOpacity 
                  activeOpacity={0.6} 
                  onPress={() => navigation.navigate('addNewAddressScreen', { address })}
                >
                  <Text style={styles.editBtnText()}>Edit</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.addressWrapper()}>
                <Text style={styles.addressLine()}>{address.address}</Text>
                <Text style={styles.addressLine()}>
                  {address.city} {address.province} {address.zipCode} {address.country}
                </Text>
              </View>
              <View style={styles.checkboxView()}>
                <TouchableOpacity
                  onPress={() => toggleCheckbox(address.id)}
                  activeOpacity={0.7}
                  style={styles.checkboxButton()}
                >
                  {checkboxFilled[address.id] ? (
                    <IcCheckBoxActive fill={color.mostlyBlack} />
                  ) : (
                    <IcCheckBoxInactive />
                  )}
                  <Text style={styles.bodyText()}>Use as default payment method</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.addAddress()}>
          <TouchableOpacity
            onPress={() => navigation.navigate('addNewAddressScreen')}
            activeOpacity={0.5}
            style={styles.addNewCardBtn()}
          >
            <IcPlus />
          </TouchableOpacity>
        </View>
      </Screen>
    </View>
  );
};

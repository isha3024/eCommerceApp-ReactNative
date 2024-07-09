import React, { useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import * as styles from './styles';
import { color, IcBackArrow, IcCheckBoxActive, IcCheckBoxInactive, IcPlus } from '../../theme';
import { Header, Screen } from '../../components';

import * as data from '../../json'

const customerAddress = data.addressList;

export const AddressScreen = () => {
  const navigation = useNavigation();
  
  const [addresses, setAddresses] = useState(customerAddress);

  const toggleCheckbox = (id) => {
    setAddresses((prevAddresses) =>
      prevAddresses.map((address) =>
        address.id === id
          ? { ...address, isDefault: true }
          : { ...address, isDefault: false }
      )
    );
  };

  const addAddress = (newAddress) => {
    setAddresses((prevAddresses) => [...prevAddresses, newAddress]);
  };

  const editAddress = (edit) => {
    setAddresses((prevAddresses) => {
      prevAddresses.map((address) => {
        return address.id === edit.id ? edit : address
      })
    })
  }

  return (
    <View style={styles.mainView()}>
      <StatusBar backgroundColor={color.primary} translucent />
      <View style={styles.topView()}>
        <Header
          headerStyle={styles.header()}
          title
          headerTitle='Shipping Addresses'
          headerLeftIcon
          leftIcon={() => {
            return <IcBackArrow />;
          }}
          leftIconPress={() => navigation.goBack()}
        />
      </View>
      <Screen withScroll bgColor={color.primary} style={styles.middleView()}>
        <View style={styles.addressCardList()}>
          {
            addresses.map((address) => {
              return (
                <View key={address.id} style={styles.addressCard()}>
                  <View style={styles.userNameView()}>
                    <Text style={styles.userName()}>{address.name}</Text>
                    <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('addNewAddressScreen', { addAddress, address, editAddress })}>
                      <Text style={styles.editBtnText()}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.addressWrapper()}>
                    <Text style={styles.addressLine()}>{address.address}</Text>
                    <Text style={styles.addressLine()}>{address.city} {address.province} {address.zipCode} {address.country}</Text>
                  </View>
                  <View style={styles.checkboxView()}>
                    <TouchableOpacity
                      onPress={() => toggleCheckbox(address.id)}
                      activeOpacity={0.7}
                      style={styles.checkboxButton()}
                    >
                      {address.isDefault ? (
                        <IcCheckBoxActive fill={color.mostlyBlack} />
                      ) : (
                        <IcCheckBoxInactive />
                      )}
                      <Text style={styles.bodyText()}>Use as default payment method</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
          )}
        </View>
        <View style={styles.addAddress()}>
          <TouchableOpacity
            onPress={() => navigation.navigate('addNewAddressScreen', { addAddress })}
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

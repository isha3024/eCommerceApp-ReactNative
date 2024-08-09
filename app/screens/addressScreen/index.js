import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button, Header, Screen } from '../../components';
import { useMainContext } from '../../contexts/MainContext';
import { color, IcBackArrow, IcCheckBoxActive, IcCheckBoxInactive, IcPlus } from '../../theme';
import * as styles from './styles';

export const AddressScreen = ({route}) => {

  const navigation = useNavigation();
  // const { addresses, loading, saveAddresses } = useMainContext();
  const { addresses, loading, setSelectedAddress, selectedAddressIndex, setSelectedAddressIndex } = useMainContext();

  // const [selectedAddressIndex, setSelectedAddressIndex] = useState(0)

  const toggleCheckbox = (index) => {
    if(selectedAddressIndex !== index){
      setSelectedAddressIndex(index)
      setSelectedAddress(addresses[index])
    }
  }


  // useEffect(() => {
  //   if(addresses.length === 1){
  //     setSelectedAddressIndex(0)
  //     setSelectedAddress(addresses[0])
  //   }
  // },[addresses])

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
      <Screen withScroll bgColor={color.primary} translucent={true} loading={loading} style={styles.middleView()}>
        {addresses.length > 0
          ? (
             <>
               <View style={styles.addressCardList()}>
                 {
                   addresses.map((address,id) => (
                     <View key={id} style={styles.addressCard()}>
                       <View style={styles.userNameView()}>
                         <Text style={styles.userName()}>{address.name}</Text>
                         <TouchableOpacity
                           activeOpacity={0.6}
                           onPress={() => navigation.navigate('addNewAddressScreen', { editAddress: address })}
                         >
                           <Text style={styles.editBtnText()}>Edit</Text>
                         </TouchableOpacity>
                       </View>
                       <View style={styles.addressWrapper()}>
                         <Text style={styles.addressLine()}>{address.addressLineOne}</Text>
                         <Text style={styles.addressLine()}>
                           {address.city} {address.province} {address.zipCode} {address.country}
                         </Text>
                       </View>
                       <View style={styles.checkboxView()}>
                         <TouchableOpacity
                           onPress={() => toggleCheckbox(id)}
                           activeOpacity={0.7}
                           style={styles.checkboxButton()}
                         >
                           {selectedAddressIndex === id ? (
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
           </>
           ) 
          : ( 
            <View style={styles.noAddressAddedView()}>
              <Text style={styles.noAddressAddedText()}>No address added yet !</Text>
              <Button
                title="Add New Address"
                btnStyle={styles.noAddressBtn()}
                onPress={() => navigation.navigate('addNewAddressScreen')}
              />
            </View>
           )
          }
      </Screen>
    </View>
  );
};

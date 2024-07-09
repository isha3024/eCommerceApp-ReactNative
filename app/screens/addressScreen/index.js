import React, { useState } from 'react'
import { View, Text, StatusBar, TouchableOpacity } from 'react-native'

import * as styles from './styles'
import { color, IcBackArrow, IcCheckBoxActive, IcCheckBoxInactive, IcPlus } from '../../theme'
import { Header, Screen } from '../../components'
import { useNavigation } from '@react-navigation/native'

export const AddressScreen = () => {

  const navigation = useNavigation()
  const [defaultAddress, setDefaultAddress] = useState(true);

  const toggleCheckbox = () => {
    setDefaultAddress(!defaultAddress)
  }

  return (
    <View style={styles.mainView()}>
      <StatusBar backgroundColor={color.primary} translucent/>
      <View style={styles.topView()}>
        <Header 
          headerStyle={styles.header()}
          title
          headerTitle='Shipping Addresses'
          headerLeftIcon
          leftIcon={() => {
            return (<IcBackArrow />)
          }}
          leftIconPress={() => navigation.goBack()}
        />
      </View>
      <Screen withScroll bgColor={color.primary} style={styles.middleView()}>
        <View style={styles.addressCardList()}>
          <View style={styles.addressCard()}>
            <View style={styles.userNameView()}>
              <Text style={styles.userName()}>Jane Doe</Text>
              <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('addNewAddressScreen')}>
                <Text style={styles.editBtnText()}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.addressWrapper()}>
              <Text style={styles.addressLine()}>3, Newbridge Court</Text>
              <Text style={styles.addressLine()}>Chino Hills, CA 91709, United States</Text>
            </View>
            <View style={styles.checkboxView()}>
              <TouchableOpacity
                onPress={toggleCheckbox}
                activeOpacity={0.7}
                style={styles.checkboxButton()}>
                {defaultAddress ? (
                  <IcCheckBoxActive fill={color.mostlyBlack} />
                ) : (
                  <IcCheckBoxInactive />
                )}
                <Text style={styles.bodyText()}>Use as default payment method</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.addressCard()}>
            <View style={styles.userNameView()}>
              <Text style={styles.userName()}>Jane Doe</Text>
              <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('addNewAddressScreen')}>
                <Text style={styles.editBtnText()}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.addressWrapper()}>
              <Text style={styles.addressLine()}>3, Newbridge Court</Text>
              <Text style={styles.addressLine()}>Chino Hills, CA 91709, United States</Text>
            </View>
            <View style={styles.checkboxView()}>
              <TouchableOpacity
                onPress={toggleCheckbox}
                activeOpacity={0.7}
                style={styles.checkboxButton()}>
                {defaultAddress ? (
                  <IcCheckBoxActive fill={color.mostlyBlack} />
                ) : (
                  <IcCheckBoxInactive />
                )}
                <Text style={styles.bodyText()}>Use as default payment method</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.addressCard()}>
            <View style={styles.userNameView()}>
              <Text style={styles.userName()}>Jane Doe</Text>
              <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('addNewAddressScreen')}>
                <Text style={styles.editBtnText()}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.addressWrapper()}>
              <Text style={styles.addressLine()}>3, Newbridge Court</Text>
              <Text style={styles.addressLine()}>Chino Hills, CA 91709, United States</Text>
            </View>
            <View style={styles.checkboxView()}>
              <TouchableOpacity
                onPress={toggleCheckbox}
                activeOpacity={0.7}
                style={styles.checkboxButton()}>
                {defaultAddress ? (
                  <IcCheckBoxActive fill={color.mostlyBlack} />
                ) : (
                  <IcCheckBoxInactive />
                )}
                <Text style={styles.bodyText()}>Use as default payment method</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  )
}

import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'

import * as styles from './styles'
import { BottomSheetContainer, Button, Header, InputField, SwitchButton, Text } from '../../components'
import { IcBackArrow, IcSearch } from '../../theme'
import { useNavigation } from '@react-navigation/native'
import { Calendar } from 'react-native-calendars'

export const SettingsScreen = () => {

  const INITIAL_DATE = '2024-07-08'

  const [changePassword, setChangePassword] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false)
  const [selectedDate, setSelectedDate] = useState(INITIAL_DATE);
  const [currentMonth, setCurrentMonth] = useState(INITIAL_DATE);

  const renderCalender = () => {
    return(
      <Calendar />
    )
  }

  const navigation = useNavigation()
  return (
    <View style={styles.mainView()}>
      <View style={styles.topView()}>
        <Header 
        headerStyle={styles.header()}
          headerLeftIcon
          leftIcon={() => {
            return(
              <IcBackArrow />
            )
          }}
          leftIconPress={() => navigation.goBack()}
          headerRightIcon
          rightIcon={() => {
            return(
              <IcSearch />
            )
          }}
        />
        <Text style={styles.mainTitle()}>Settings</Text>
      </View>
      <View style={styles.personalInfo()}>
        <Text style={styles.sectionTitle()}>Personal Information</Text>
        <InputField 
          placeholder='Full name'
          keyboardType='default'
          autoCapitalize={true}
          label='Full name'
        />
        <InputField 
          placeholder='Date of Birth'
          keyboardType='numeric'
          autoCapitalize={true}
          label='Date of Birth'
          onPress={renderCalender()}
        />
      </View>
      <View style={styles.passwordView()}>
        <View style={styles.passwordTitle()}>
          <Text style={styles.sectionTitle()}>Password</Text>
          <TouchableOpacity activeOpacity={0.6} onPress={() => setChangePassword(true)}>
            <Text style={styles.changePasswordText()}>Change</Text>
          </TouchableOpacity>
        </View>
        <InputField 
          label='Password'
          placeholder='Password'
          keyboardType='default'
          autoCapitalize={true}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.notification()}>
        <Text style={styles.sectionTitle()}>Notification</Text>
        <View style={styles.notificationItem()}>
          <Text style={styles.notificationTitle()}>Sale</Text>
          <View style={styles.notificationSwitch()}>
            <SwitchButton />
          </View>
        </View>
        <View style={styles.notificationItem()}>
          <Text style={styles.notificationTitle()}>New arrivals</Text>
          <View style={styles.notificationSwitch()}>
            <SwitchButton />
          </View>
        </View>
        <View style={styles.notificationItem()}>
          <Text style={styles.notificationTitle()}>Delivery Status Change</Text>
          <View style={styles.notificationSwitch()}>
            <SwitchButton />
          </View>
        </View>
      </View>
      <BottomSheetContainer
      isVisible={changePassword}
      customHeight={'55%'}
      onClose={() => setChangePassword(false)}>
        <View style={styles.passwordChangeView()}>
          <Text style={styles.bottomSheetTitle()}>Password Change</Text>
          <View style={styles.forgetPassword()}>
            <InputField 
              label='Old Password'
              placeholder='Old Password'
              secureTextEntry={true}
              keyboardType='default'
            />
            <TouchableOpacity activeOpacity={0.6}>
              <Text style={styles.changePasswordText()}>Forget Password?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.newPassword()}>
            <InputField 
              label='New Password'
              placeholder='New Password'
              secureTextEntry={true}
              keyboardType='default'
            />
            <InputField 
              label='Repeat New Password'
              placeholder='Repeat New Password'
              secureTextEntry={true}
              keyboardType='default'
            />            
          </View>
          <Button title='SAVE PASSWORD' btnStyle={styles.button()} />
        </View>
      </BottomSheetContainer>
    </View>
  )
}

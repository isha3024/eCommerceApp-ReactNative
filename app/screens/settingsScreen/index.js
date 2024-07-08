import React, { useState } from 'react'
import { Modal, TouchableOpacity, View } from 'react-native'

import * as styles from './styles'
import { BottomSheetContainer, Button, Header, InputField, SwitchButton, Text } from '../../components'
import { color, IcBackArrow, IcSearch } from '../../theme'
import { useNavigation } from '@react-navigation/native'
import { format } from 'date-fns';
import { Calendar } from 'react-native-calendars'

export const SettingsScreen = () => {


  const [changePassword, setChangePassword] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false)
  const [selectedDate, setSelectedDate] = useState('');

  const handleDatePress = (day) => {
    setSelectedDate(day.dateString);
    setShowCalendar(false);
  };
   
  const handleInputPress = () => {
    setShowCalendar(true)
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
        <TouchableOpacity activeOpacity={0.8} onPress={handleInputPress}>   
          <InputField 
            label='Date of Birth'
            placeholder='Date of Birth'
            autoCapitalize={false}
            value={selectedDate ? format(new Date(selectedDate), 'dd/mm/yyyy') : ''}
            editable={false}
          />
        </TouchableOpacity>
        <Modal 
          visible={showCalendar}
          transparent={true}
          animationType='slide'
          onRequestClose={() => setShowCalendar(false)}>
            <View style={styles.modalContainer()}>
            <View style={styles.calendarContainer()}>
            <Calendar
              onDayPress={handleDatePress}
              markedDates={{
                [selectedDate]: { selected: true, marked: true, selectedColor: 'rgb(219,48,34)' },
              }}
            />
            <TouchableOpacity onPress={() => setShowCalendar(false)} style={styles.closeButton()}>
              <Text style={styles.closeButtonText()}>Close</Text>
            </TouchableOpacity>
            </View>
            </View>
          </Modal>
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

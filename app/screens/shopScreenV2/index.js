import React from 'react'
import { StatusBar, View } from 'react-native'
import { CustomTopTabBar, Header, KidsCategories, MenCategories, Screen, WomenCategories } from '../../components'
import { IcBackArrow, IcSearch, color, fontSize, fonts, size } from '../../theme'

import * as styles from './styles'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useNavigation } from '@react-navigation/native'

const Tab = createMaterialTopTabNavigator();

export const ShopScreenV2 = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.mainView()}>
      <View style={styles.topView()}>
        <StatusBar translucent={true} backgroundColor={color.white}/>
      <Header 
        headerStyle={styles.header()}
        leftIconPress={() => navigation.goBack()}
        headerLeftIcon
        leftIcon={() => {
          return (<IcBackArrow fill={color.mostlyBlack} width={size.moderateScale(10)} height={size.moderateScale(16)} />)
        }}
        title
        headerTitle='Categories'
        headerRightIcon
        rightIcon={() => {
          return (<IcSearch />)
        }}
      />
      </View>
     <Tab.Navigator tabBar={props => <CustomTopTabBar {...props} />} screenOptions={{
      tabBarLabelStyle: {
        fontSize: fontSize.littleMedium,
        fontFamily: fonts.metropolisRegular,
        textTransform: 'capitalize'
      },
      tabBarPressColor: color.customTransparent(0.1),
      tabBarStyle: {
        borderBottomColor: color.secondary
      },
      tabBarInactiveTintColor: color.mostlyBlack,
      tabBarAllowFontScaling: true
     }}>
        <Tab.Screen name='womenCategories' component={WomenCategories} options={{
          tabBarLabel: 'Women'
        }} />
        <Tab.Screen name='menCategories' component={MenCategories} options={{
          tabBarLabel: 'Men'
        }} />
        <Tab.Screen name='kidsCategories' component={KidsCategories} options={{
          tabBarLabel: 'Kids'
        }} />
     </Tab.Navigator>
    </View>
  )
}

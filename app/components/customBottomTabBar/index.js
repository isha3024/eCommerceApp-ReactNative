import React from 'react'
import { TouchableOpacity, View } from 'react-native';

import * as styles from './styles'
import { IcCart, IcCartActive, IcFavorite, IcFavoriteActive, IcHomeActive, IcHomeInactive, IcPerson, IcPersonActive, IcShop, IcShopActive, size } from '../../theme';
import { Text } from '../text';


export const CustomBottomTabBar = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.mainBottomContainer()}>
    {
      state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = 
        options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;

        let Icon;
        if(route.name == 'homeStackNavigation'){
          Icon = state.index === index ? IcHomeActive : IcHomeInactive;
        }
        else if(route.name == 'shopStackNavigation'){
          Icon = state.index === index ? IcShopActive : IcShop;
        }
        else if(route.name == 'bagScreen'){
          Icon = state.index === index ? IcCartActive : IcCart;
        }
        else if(route.name == 'favoriteScreen'){
          Icon = state.index === index ? IcFavoriteActive : IcFavorite;
        }
        else if(route.name == 'profileScreen'){
          Icon = state.index === index ? IcPersonActive : IcPerson;
        }
        
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.bottomBarItem()}
            key={index.toString()}
          >
            {Icon && <Icon height={size.moderateScale(26)} width={size.moderateScale(30)} />}
            <Text style={styles.screenLabel(isFocused)}>{label}</Text>
          </TouchableOpacity>
        )
      })
    }
    </View>
  )
}

import {View, TouchableOpacity } from 'react-native';
import { useNavigationState } from '@react-navigation/native';

import { Text } from '../text';
import * as styles from './styles'


export const CustomTopTabBar = ({ state, descriptors, navigation }) => {
  
  const screenName = useNavigationState((state) => state.routes[state.index].name);
  return (
    <View style={styles.customTopTabBar(screenName === 'orderScreen')}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

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

        if(screenName === 'orderScreen'){
          return (
            <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.orderScreenLabel(isFocused)}
            key={label}
          >
            <Text style={styles.orderScreenText(isFocused)}>
              {label}
            </Text>
          </TouchableOpacity>
        );
        }else {
          return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.labelContainer(isFocused)}
            key={label}
          >
            <Text style={styles.label(isFocused)}>
              {label}
            </Text>
          </TouchableOpacity>
        );
        }        

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.labelContainer(isFocused), screenName === 'orderScreen' && styles.orderScreenLabel(isFocused)]}
            key={label}
          >
            <Text style={[isFocused && styles.label(isFocused), screenName === 'orderScreen' && styles.orderScreenText(isFocused)]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
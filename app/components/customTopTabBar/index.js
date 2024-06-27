import {View, TouchableOpacity } from 'react-native';

import * as styles from './styles'
import { Text } from '../text';



export const CustomTopTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.customTopTabBar()}>
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
      })}
    </View>
  );
}
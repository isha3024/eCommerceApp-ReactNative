import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { SortBy } from '../sortBy';

import * as styles from './styles'

export const BottomSheetContainer = ({isVisible, onClose, navigation}) => {
  
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['1%', '40%'], []);

  useEffect(() => {
    if (navigation) {
      navigation.setOptions({tabBarVisible: !isVisible})
    }
  }, [isVisible, navigation]);

  return (
    <>
      {
        isVisible && (
          <View style={styles.overlay()}>
            <BottomSheet
              ref={bottomSheetRef}
              index={1}
              snapPoints={snapPoints}
              handleComponent={() => {
                return(
                  <View style={styles.handleComponent()}>
                    <View style={styles.handle()}/>
                  </View>
                )
              }}
              enablePanDownToClose={true}
              onChange={(index) => {
                if(index === -1) {
                  onClose();
                }
              }}
            >
              <View style={styles.contentContainer()}>
                <SortBy />
              </View>
            </BottomSheet>
          </View>
        )
      }
    </>
  );
};


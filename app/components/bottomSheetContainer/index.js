import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { View } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { SortBy } from '../sortBy';

import * as styles from './styles'
import { Text } from '../text';

export const BottomSheetContainer = ({isVisible, onClose}) => {
  
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["1%", "45%"], []);

  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const renderBackdrop = useCallback((props) => (
  <BottomSheetBackdrop
    {...props}
    disappearsOnIndex={-1}
    appearsOnIndex={0}
    onPress={handleClosePress}
  />),[]);

  return (
    <>
      {
        isVisible && (
          <View style={styles.overlay()}>
            <BottomSheet
              ref={bottomSheetRef}
              index={1}
              snapPoints={snapPoints}
              backdropComponent={renderBackdrop}
              onChange={(index) => {
                if(index === -1) {
                  onClose();
                }
              }}
              style={styles.bottomSheet()}
              handleComponent={() => {
                return(
                  <View style={styles.handleComponent()}>
                    <View style={styles.handle()}/>
                  </View>
                )
              }}
              enablePanDownToClose={true}
            >
              <View style={styles.contentContainer()}>
                <Text style={styles.title()}>Sort by</Text>
                <SortBy />
              </View>
            </BottomSheet>
          </View>
        )
      }
    </>
  );
};


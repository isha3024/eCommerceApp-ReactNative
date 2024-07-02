import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { View } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';

import * as styles from './styles'

export const BottomSheetContainer = ({isVisible, onClose, children}) => {
  
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
            >
              <View style={styles.contentContainer()}>
                {children}
              </View>
            </BottomSheet>
          </View>
        )
      }
    </>
  );
};


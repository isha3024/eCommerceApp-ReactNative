import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { View } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';

import * as styles from './styles'
import { Text } from '../text';
import { color } from '../../theme';

export const BottomSheetContainer = ({isVisible, onClose, children, customHeight}) => {
  
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["1%", customHeight], []);

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
              enablePanDownToClose={true}
              onChange={(index) => {
                if(index === -1) {
                  onClose();
                }
              }}
              backgroundStyle={{backgroundColor: color.primary}}
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


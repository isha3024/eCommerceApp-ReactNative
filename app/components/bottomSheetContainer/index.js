import React, { useCallback, useMemo, useRef } from 'react';
import { View } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';

import { color } from '../../theme';
import * as styles from './styles'

export const BottomSheetContainer = ({isVisible, onClose, children, customHeight}) => {
  
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["1%", customHeight],[]);

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
              // shouldMeasureContentHeight={true}
              // enableDynamicSizing={true}
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


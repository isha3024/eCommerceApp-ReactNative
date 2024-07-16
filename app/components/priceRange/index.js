import React, { useCallback, useState } from "react"
import { View, Text, StyleSheet } from "react-native"

import Thumb from "./Thumb"
import Rail from "./Rail"
import RailSelected from "./RailSelected"
import RnRangeSlider from "rn-range-slider"
import { color, fonts, fontSize } from "../../theme"



const PriceRange = ({lowPrice, highPrice, minValue, maxValue}) => {

  const [rangeDisabled, setRangeDisabled] = useState(false)
  const [low, setLow] = useState(lowPrice)
  const [high, setHigh] = useState(highPrice)
  const [min, setMin] = useState(minValue)
  const [max, setMax] = useState(maxValue)
  console.log('lowPrice: ', low, ' highPrice:', high);

  const renderThumb = useCallback(name => <Thumb name={name} />, [])
  const renderRail = useCallback(() => <Rail />, [])
  const renderRailSelected = useCallback(() => <RailSelected />, [])
  const handleValueChange = useCallback((lowValue, highValue) => {
    setLow(lowValue)
    setHigh(highValue)
  }, [])
  
  return (
    <View>
        <View style={styles.horizontalContainer}>
          <Text style={styles.valueText}>${low}</Text>
          <Text style={styles.valueText}>${high}</Text>
        </View>
        <RnRangeSlider
          style={styles.slider}
          min={min}
          max={max}
          step={1}
          disableRange={rangeDisabled}
          renderThumb={renderThumb}
          renderRail={renderRail}
          renderRailSelected={renderRailSelected}
          onValueChanged={handleValueChange}
        />
    </View>
  )
}

export default PriceRange

const styles = StyleSheet.create({
  slider: {
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  valueText: {
    color: color.mostlyBlack,
    fontSize: fontSize.small,
    fontFamily: fonts.metropolisMedium
  },
});
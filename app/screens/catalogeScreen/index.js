import React from 'react' 
import { View, StatusBar, FlatList, TouchableOpacity } from 'react-native'
import { Header, Screen, Text, Title } from '../../components'
import { IcBackArrow, IcFilter, IcGrid, IcSearch, IcSort, IcSortIcon, color } from '../../theme'

import * as styles from './styles'

const womenTopCategory = [
  {
    id: 1,
    name: 'T-shirts',
  },
  {
    id: 2,
    name: 'Crop tops',
  },
  {
    id: 3,
    name: 'Sleevless',
  },
  {
    id: 4,
    name: 'Shirts',
  },
  {
    id: 5,
    name: 'Blouses',
  },
  {
    id: 6,
    name: 'Oversized',
  },
]
const renderWomenTop = ({item}) => {
  return(
    <View style={styles.listItem()}>
      <Text style={styles.listText()}>{item.name}</Text>
    </View>
  )
}


export const CatalogeScreen = () => {
  return (
    <Screen bgColor={color.white}>
      <StatusBar translucent={true}/>
      <Header
        headerStyle={styles.header()}
        headerLeftIcon
        leftIcon={() => {
          return (<IcBackArrow />)
        }} 
        headerRightIcon
        rightIcon={() => {
          return <IcSearch />
        }}
      />
      <View style={styles.mainView()}>
        <Text style={styles.title()}>Women's tops</Text>
      </View>
      <View style={styles.horizontalScroll()}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={womenTopCategory}
          renderItem={renderWomenTop}
          keyExtractor={item => item.id}
        />
        <View style={styles.filterContainer()}>
          <TouchableOpacity style={styles.filterItem()}>
            <IcFilter />
            <Text style={styles.filterItemText()}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterItem()}>
            <IcSortIcon />
            <Text style={styles.filterItemText()}>Price: Low to High</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterItem()}>
            <IcGrid />
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  )
}

import React, { useRef, useState } from 'react' 
import { View, StatusBar, FlatList, TouchableOpacity, Animated, Platform, UIManager, LayoutAnimation } from 'react-native'
import { Header, ProductCardMain, Screen, Text, Title } from '../../components'
import { IcBackArrow, IcFilter, IcGrid, IcList, IcSearch, IcSort, IcSortIcon, color, size } from '../../theme'

import * as styles from './styles'
import * as data from '../../json'
import { useNavigation } from '@react-navigation/native'


if(Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental){
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

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

const products = data.productList;


export const CatalogeScreen = () => {
  const navigation = useNavigation();
  const [showGrid, setShowGrid] = useState(false);
  const [title, showTitle] = useState(false);

  const toggleLayout = () => {
    LayoutAnimation.configureNext({
      duration: 500,
      create: {type: 'linear', property: 'opacity'},
      update: {type: 'spring', springDamping: 0.4},
      delete: {type: 'linear', property: 'opacity'},
    });
    setShowGrid(!showGrid);
    showTitle(!title);
    console.log('title: ',title)
    console.log('showGrid: ',showGrid) 
  } 

  const renderProducts = ({item}) => {   
    return (
        <ProductCardMain 
          productHorizontal={showGrid ? true : false}
          productTitle={item?.name}
          brandName={item?.brand}
          ratings={item?.rating}
          ratingsCounts={item?.rating_count}
          regularPrice={item?.regularPrice}
          newProduct={item?.isProductNew}
          productImage={item.images}
          topRightIcon={false}
          customProductStyle={showGrid ? null : styles.productCardGridItem()}
        />
      )
    }

  return (
    <Screen bgColor={color.white}>
      <StatusBar translucent={true}/>
      <Header
        title={title ? true : false}
        headerTitle={"Women's top"}
        headerStyle={styles.header(title)}
        leftIconPress={() => navigation.goBack()}
        headerLeftIcon
        leftIcon={() => {
          return (<IcBackArrow />)
        }} 
        headerRightIcon
        rightIcon={() => {
          return <IcSearch />
        }}
      />
      <View style={styles.topContainer()}>
        <View style={styles.mainView()}>
          {title ? null : (<Text style={styles.title()}>Women's tops</Text>)}
        </View>
        <View style={styles.horizontalScroll(title)}>
          <View style={styles.flatList()}>
          <FlatList
            horizontal
            contentContainerStyle={{paddingRight:10}}
            showsHorizontalScrollIndicator={false}
            data={womenTopCategory}
            renderItem={renderWomenTop}
            keyExtractor={item => item.id}
          />
          </View>
          <View style={styles.filterContainer()}>
            <TouchableOpacity style={styles.filterItem()}>
              <IcFilter />
              <Text style={styles.filterItemText()}>Filter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterItem()}>
              <IcSortIcon />
              <Text style={styles.filterItemText()}>Price: Low to High</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleLayout} style={styles.filterIcon()}>
              {
                showGrid ? ( <IcGrid /> ) : ( <IcList /> )
              }
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View 
        style={styles.bottomContainer()}>
        {
          showGrid ? (
            <FlatList
              key={'_'}
              keyExtractor={item => '_'+item.name}
              horizontal={false}
              contentContainerStyle={{ paddingBottom: 80 }}
              style={{ height: '95%' }}
              data={products}
              renderItem={renderProducts}
            />
          ) : (
            <FlatList
              key={'#'}
              keyExtractor={item => '#'+item.name}
              horizontal={false}
              numColumns={2}
              contentContainerStyle={{ paddingBottom: 80 }}
              style={{ height: '95%' }}
              data={products}
              renderItem={renderProducts}
            />
          )
        } 
      </View>
    </Screen>
  )
}

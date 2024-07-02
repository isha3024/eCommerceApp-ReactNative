import React, { useEffect, useRef, useState } from 'react' 
import { View, StatusBar, FlatList, TouchableOpacity, Platform, UIManager, LayoutAnimation } from 'react-native'
import { BottomSheetContainer, Header, ProductCardMain, Screen, SortBy, Text } from '../../components'
import { IcBackArrow, IcFilter, IcGrid, IcList, IcSearch, IcSortIcon, color, size } from '../../theme'

import * as styles from './styles'
import * as data from '../../json'
import { useNavigation } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

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


const sortProductType = [
  {
    id: 1,
    name: 'Popular'
  },
  {
    id: 2,
    name: 'Newest'
  },
  {
    id: 3,
    name: 'Customer review'
  },
  {
    id: 4,
    name: 'Price: lowest to high'
  },
  {
    id: 5,
    name: 'Price: highest to low'
  }
]

export const CatalogeScreen = () => {
  const navigation = useNavigation();
  const products = data.productList;
  const [showProductList, setShowProductList] = useState(products);
  const [isSheetVisible, setSheetVisible] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [title, showTitle] = useState(false);
  const [isSelected, setIsSelected] = useState(null);
  const [sortedProducts, setSortedProducts] = useState([]);
  console.log('showProductList: ', showProductList);

  useEffect(() => {
    const preSelectedSortItem = sortProductType.find(item => item.name === 'Price: lowest to high');
    setIsSelected(preSelectedSortItem);
    setSortedProducts(preSelectedSortItem);
  },[]);

  const sortProducts = (sortOption) => {
    let sortedList = [...products];
    switch (sortOption.id) {
      case 1:
        sortedList.sort((a, b) => a.regularPrice - b.regularPrice);
        break;
      case 2:
        sortedList.sort((a, b) => b.regularPrice - a.regularPrice);
        break;
      default:
        break;
    }
    setShowProductList(sortedList);
  };

  const renderSortProductTypes = ({item}) => {
    return(
      <TouchableOpacity 
        activeOpacity={0.7} 
        onPress={() => {
          setIsSelected(item);
          sortProducts(item);
          setSheetVisible(false);
        }} 
        style={[styles.sortListItem(), item.id === isSelected?.id && styles.selectedItem()]}>
        <Text style={[styles.sortItemText(), item.id === isSelected?.id && styles.selectedItemText()]}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  const handleOpenPress = () => {
    setSheetVisible(true);
  }
  const handleClosePress = () => {
    setSheetVisible(false);
  }

  const toggleLayout = () => {
    LayoutAnimation.configureNext({
      duration: 400,
      create: {type: 'linear', property: 'opacity'},
      update: {type: 'linear', property: 'opacity'},
      delete: {type: 'linear', property: 'opacity'},
    });
    setShowGrid(!showGrid);
    showTitle(!title);
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
          productImage={item?.images}
          topRightIcon={false}
          customProductStyle={showGrid ? null : styles.productCardGridItem()}
        />
      )
    }

  return (
    <GestureHandlerRootView>
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
              <TouchableOpacity onPress={() => navigation.navigate('filterScreen')} style={styles.filterItem()}>
                <IcFilter />
                <Text style={styles.filterItemText()}>Filter</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleOpenPress} style={styles.filterItem()}>
                <IcSortIcon />
                <Text style={styles.filterItemText()}>{isSelected ? isSelected.name : 'Sort'}</Text>
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
                horizontal={false}
                contentContainerStyle={{ paddingBottom: 80 }}
                style={{ height: '95%' }}
                data={showProductList}
                renderItem={renderProducts}
                key={'_'}
                keyExtractor={item => '_'+item.name}
              />
            ) : (
              <FlatList
                horizontal={false}
                numColumns={2}
                contentContainerStyle={{ paddingBottom: 80 }}
                style={{height: '95%' }}
                data={showProductList}
                renderItem={renderProducts}
                key={'#'}
                keyExtractor={(item) => item.id.toString()}
              />
            )
          } 
        </View>
        <BottomSheetContainer
          isVisible={isSheetVisible}
          onClose={handleClosePress}
          navigation={navigation}
          onPress={handleClosePress}>
          <Text style={styles.titleSort()}>Sort by</Text>
          <FlatList
            data={sortProductType}
            renderItem={renderSortProductTypes}
            keyExtractor={(item) => item.id}
          />
        </BottomSheetContainer>
      </Screen>
    </GestureHandlerRootView>
  )
}

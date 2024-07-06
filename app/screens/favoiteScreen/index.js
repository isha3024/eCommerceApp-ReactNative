import React, { useEffect, useState } from 'react' 
import { View, StatusBar, FlatList, TouchableOpacity, Platform, UIManager, LayoutAnimation } from 'react-native'
import { BottomSheetContainer, Button, Header, ProductCardMain, Screen, SortBy, Text } from '../../components'
import { IcFilter, IcGrid, IcList, IcSearch, IcSortIcon, color, size } from '../../theme'

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

// render function for rendering women categories at top
const renderWomenTop = ({item}) => {
  return(
    <View style={styles.listItem()}>
      <Text style={styles.listText()}>{item.name}</Text>
    </View>
  )
}

//sort product array to sort the product using populariy, reviews, etc..
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


export const FavoriteScreen = ({route}) => {
  // if(route){
  //   let selectedSize = route.params.selectedSize;
  // }
  // console.log('selectedSize: ', selectedSize)
  const navigation = useNavigation();
  //product data json
  const products = data.productList;

  //on screen load show the products
  const [showProductList, setShowProductList] = useState(products);

  //sort options bottom sheet useState
  const [isSheetVisible, setSheetVisible] = useState(false);

  //sort option selected useState
  const [isSelected, setIsSelected] = useState(null);

  //toggling the product in Grid/List
  const [showGrid, setShowGrid] = useState(true);

  //toggling to show the header title and main category title
  const [title, showTitle] = useState(false);

  //selected product Id
  const [selectedProductId, setSelectedProductId] = useState(null);

  //on screen load sort product based on price low to high ---- not working
  useEffect(() => {
    const preSelectedSortItem = sortProductType.find(item => item.name === 'Price: lowest to high');
    setIsSelected(preSelectedSortItem);
    sortProducts(preSelectedSortItem);
  }, []);

  //toggling the layout -- grid / list and headerTitle / mainTitle 
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

  /**sorting the product based on selection */
  const sortProducts = (sortOption) => {
    let sortedList = [...products];
    // console.log('list: ', sortedList);
    switch (sortOption.id) {
      case 4:
        sortedList.sort((a, b) => a.originalPrice - b.originalPrice);
        break;
      case 5:
        sortedList.sort((a, b) => b.originalPrice - a.originalPrice);
        break;
      default:
        break;
    }
    setShowProductList(sortedList);
  };

  //handling the sort option selected but not working as expected
  const handleSortOptionChange = (sortOption) => {
    setIsSelected(sortOption);
    setSheetVisible(false);
    sortProducts(sortOption);
  }

  //rendering the sort options using the renderItem function in FlatLists
  const renderSortProductTypes = ({ item, isSelected }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => handleSortOptionChange(item)}
      style={[styles.sortListItem(), item.id === isSelected?.id && styles.selectedItem()]}>
      <Text style={[styles.sortItemText(), item.id === isSelected?.id && styles.selectedItemText()]}>{item.name}</Text>
    </TouchableOpacity>
  );

  //handling the sort option bottom sheet visibility
  const handleOpenPress = () => {
    setSheetVisible(true);
  }
  const handleClosePress = () => {
    setSheetVisible(false);
  }

  const handleProductRemove = (id) => {
    setShowProductList(showProductList.filter(product => product.id !== id));
  }


  //rendering the products using the renderItem function of FlatLists
  const renderProducts = ({item}) => {
    return (
        <ProductCardMain 
          onProductPress={() => {setSelectedProductId(item.id)}}
          removeFromListIconPress={() => handleProductRemove(item.id)}
          productHorizontal={showGrid ? true : false}
          productTitle={item?.name}
          brandName={item?.brand}
          showRatingHorizontal={showGrid ? true : false}
          ratings={item?.ratings}
          ratingsCounts={item?.rating_count}
          originalPrice={item?.originalPrice}
          productImage={item?.images}
          topRightIcon={true}
          addToCartIcon={true}
          productColor={item?.productColor}
          // productSize={route ? selectedSize : null}
          isProductSold={item?.isProductSold}
          flotingBtnStyle={showGrid ? null : styles.flotingButton()}
          customProductStyle={showGrid ? null : styles.productCardGridItem()}
        />
      )
  }

  return (
      <Screen bgColor={color.white}>
        <StatusBar translucent={true}/>
        <Header
          title={title ? true : false}
          headerTitle={"Favorites"}
          headerStyle={styles.header(title)}
          headerRightIcon
          rightIcon={() => {
            return <IcSearch />
          }}
        />
        <View style={styles.topContainer()}>
          <View style={styles.mainView()}>
            {title ? null : (<Text style={styles.title()}>Favorites</Text>)}
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
          customHeight={'45%'}
          onPress={handleClosePress}>
          <Text style={styles.titleBottomSheet()}>Sort by</Text>
          <FlatList
            data={sortProductType}
            renderItem={renderSortProductTypes}
            keyExtractor={(item) => item.id}
          />
        </BottomSheetContainer>
      </Screen>
  )
}

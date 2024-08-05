import React, { useEffect, useState } from 'react'
import { View, FlatList, TouchableOpacity, Platform, UIManager, LayoutAnimation } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

import { IcFilter, IcGrid, IcList, IcSearch, IcSortIcon, color } from '../../theme'
import { BottomSheetContainer, Button, Header, ProductCardMain, Screen, Text } from '../../components'
import * as styles from './styles'

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
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
const renderWomenTop = ({ item }) => {
  return (
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


export const FavoriteScreen = () => {

  const navigation = useNavigation();
  const productList = useSelector((state) => state.product.products);


  const [showProductList, setShowProductList] = useState([]);
  const [isSheetVisible, setSheetVisible] = useState(false);
  const [isSortOptionSelected, setIsSortOptionSelected] = useState(null);
  const [sortOptionName, setSortOptionName] = useState(null)
  const [showGrid, setShowGrid] = useState(true);
  const [title, showTitle] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);


  //toggling the layout -- grid / list and headerTitle / mainTitle 
  const toggleLayout = () => {
    LayoutAnimation.configureNext({
      duration: 400,
      create: { type: 'linear', property: 'opacity' },
      update: { type: 'linear', property: 'opacity' },
      delete: { type: 'linear', property: 'opacity' },
    });
    setShowGrid(!showGrid);
    showTitle(!title);
  }

  /**sorting the product based on selection */
  const sortProducts = (sortOption) => {
    let sortedList = [...showProductList];
    switch (sortOption.id) {
      case 3:
        sortedList.sort((a, b) => b.ratings - a.ratings);
        break;
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
    setSortOptionName(sortOption.name);
    setIsSortOptionSelected(sortOption);
    sortProducts(sortOption);
    setSheetVisible(false);
  }

  const handleOpenPress = () => {
    setSheetVisible(true);
  }

  const handleClosePress = () => {
    setSheetVisible(false);
  }

  const showOnlyFavoriteProducts = () => {
    const favProducts = productList.filter((fav) => fav.isFavorite === true);
    setShowProductList(favProducts)
  }

  const handleProductRemove = (id) => {
    setShowProductList(showProductList.filter(product => product.id !== id));
  }

  const renderProducts = ({ item }) => {
    return (
      <ProductCardMain
        onProductPress={() => { setSelectedProductId(item.id) }}
        productHorizontal={showGrid ? true : false}
        productTitle={item?.name}
        brandName={item?.brand}
        productColor='Orange'
        productSize='L'
        showRatings={true}
        showRatingHorizontal={true}
        ratings={item?.ratings}
        showDiscount={showGrid ? false : true}
        ratingsCounts={item?.rating_count}
        originalPrice={item?.originalPrice}
        sellingPrice={item?.sellingPrice}
        newProduct={showGrid ? false : item?.isProductNew}
        isProductSold={item?.isProductSold}
        productImage={item?.images}
        topRightIcon={true}
        addToFavoriteIcon={false}
        addToCartIcon={true}
        showTopRightIcon={true}
        addToCartBtnStyle={!showGrid ? styles.flotingButton() : styles.flotingButtonList()}
        customProductStyle={showGrid ? styles.productCardListItem() : styles.productCardGridItem()}
        closeIconStyle={showGrid ? styles.closeIconList() : styles.closeIconGrid()}
        removeFromListIconPress={() => handleProductRemove(item.id)}
      />
    )
  }

  useEffect(() => {
    showOnlyFavoriteProducts()
  }, [productList])

  useEffect(() => {
    setIsSortOptionSelected(sortProductType[3])
    setSortOptionName(sortProductType[3].name)
  }, [])


  return (
    <Screen bgColor={color.white} translucent={true}>
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
              contentContainerStyle={{ paddingRight: 10 }}
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
              <Text style={styles.filterItemText()}>{sortOptionName ?? 'Sort'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleLayout} style={styles.filterIcon()}>
              {
                showGrid ? (<IcGrid />) : (<IcList />)
              }
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {
        showProductList.length == 0
          ? (
            <View style={styles.favProductsEmptyView()}>
              <Text style={styles.emptyText()}>No Favorite Products</Text>
              <Button 
                title='ADD PRODUCTS'
                border
                onPress={() => navigation.navigate('homeStackNavigation')}
              />
            </View>
          ) : (
            <View
              style={styles.bottomContainer(showGrid)}>
              {
                showGrid ? (
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 80 }}
                    data={showProductList}
                    renderItem={renderProducts}
                    key={'_'}
                    keyExtractor={item => '_' + item.name}
                  />
                ) : (
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    contentContainerStyle={{ paddingBottom: 80 }}
                    data={showProductList}
                    renderItem={renderProducts}
                    key={'#'}
                    keyExtractor={(item) => item.id.toString()}
                  />
                )
              }
            </View>
          )

      }
      <BottomSheetContainer
        isVisible={isSheetVisible}
        onClose={handleClosePress}
        customHeight={'42%'}
        onPress={handleClosePress}>
        <Text style={styles.titleBottomSheet()}>Sort by</Text>
        <View style={styles.mainSortOptionView()}>
          {
            sortProductType.map((sort) => {
              const isSelected = sort === isSortOptionSelected;
              return (
                <TouchableOpacity activeOpacity={0.8} onPress={() => handleSortOptionChange(sort)} style={styles.sortOptionView(isSelected)} key={sort.id}>
                  <Text style={styles.sortOptionText(isSelected)}>{sort.name}</Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </BottomSheetContainer>
    </Screen>
  )
}

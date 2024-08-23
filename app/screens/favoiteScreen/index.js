import React, { useCallback, useEffect, useState } from 'react'
import { View, FlatList, TouchableOpacity, Platform, UIManager, LayoutAnimation, ToastAndroid, LogBox } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { firebase } from '@react-native-firebase/auth'
import { doc, getDoc, getFirestore } from '@react-native-firebase/firestore'

import { IcFilter, IcGrid, IcList, IcSearch, IcSortIcon, color } from '../../theme'
import { BottomSheetContainer, Button, Header, ProductCardMain, Screen, Text } from '../../components'
import { useMainContext } from '../../contexts/MainContext'
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
  const db = getFirestore();
  const { userInfo } = useSelector(state => state.authUser);

  LogBox.ignoreLogs(['Encountered two children with the same key']);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favoriteProductIds, setFavoriteProductIds] = useState([]);
  console.log('favoriteProductIds: ',favoriteProductIds)
  const [isSheetVisible, setSheetVisible] = useState(false);
  const [isSortOptionSelected, setIsSortOptionSelected] = useState(null);
  const [sortOptionName, setSortOptionName] = useState(null)
  const [showGrid, setShowGrid] = useState(false);
  const [title, showTitle] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const fetchfavoritesProduct = async () => {
    const userDocId = firebase.firestore()
    .collection('users')
    .doc(userInfo.uid).id;

    const productsSnapshot = await firebase.firestore().collection('products').get();
    const productList = productsSnapshot.docs.map(doc => {
      const productData = doc.data();
      return productData;
    });
    
    const docRef = doc(db, `users/${userDocId}/favoriteProducts/favoritesList`)
    setLoading(true)
    try {
      const docSnap = await getDoc(docRef);

      if(docSnap.exists) {
        const data = docSnap.data();
        const productIds = data.productIds || [];
        setFavoriteProductIds(productIds);
        const favoriteProducts = productList.filter(product => productIds.includes(product.id));
        setProducts(favoriteProducts)
      }else {
        console.log('No such document!');
      }
      
    } catch (error) {
      console.log(error) 
    }
    finally {
      setLoading(false)
    }
  }

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
    let sortedList = [...products];
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
    setProducts(sortedList);
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

  const handleProductRemove = async (item) => { 
    console.log(item)
  }

  const renderProducts = ({ item }) => {
    return (
      <ProductCardMain
        onProductPress={() => { setSelectedProductId(item.id) }}
        productHorizontal={showGrid ? true : false}
        productTitle={item?.title}
        brandName={item?.brand}
        showRatings={true}
        showRatingHorizontal={true}
        ratings={item?.ratings}
        showDiscount={showGrid ? false : true}
        ratingsCounts={item?.rating_count}
        originalPrice={item?.price}
        isProductSold={item?.isProductSold}
        productImage={item?.images[0]}
        topRightIcon={true}
        addToFavoriteIcon={false}
        addToCartIcon={true}
        showTopRightIcon={true}
        addToCartBtnStyle={!showGrid ? styles.flotingButton() : styles.flotingButtonList()}
        customProductStyle={showGrid ? styles.productCardListItem() : styles.productCardGridItem()}
        closeIconStyle={showGrid ? styles.closeIconList() : styles.closeIconGrid()}
        removeFromListIconPress={() => handleProductRemove(item)}
      />
    )
  }

  useEffect(() => {
    setIsSortOptionSelected(sortProductType[3])
    setSortOptionName(sortProductType[3].name)
  }, [])

    useEffect(() => {
      fetchfavoritesProduct()
    },[favoriteProductIds])


  return (
    <Screen bgColor={color.white} translucent={true} loading={loading}>
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
        products.length === 0
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
                    data={products}
                    renderItem={renderProducts}
                    key={'_'}
                    keyExtractor={item => '_' + item.name}
                  />
                ) : (
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    contentContainerStyle={{ paddingBottom: 80 }}
                    data={products}
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

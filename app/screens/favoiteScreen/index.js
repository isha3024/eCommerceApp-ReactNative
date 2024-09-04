import React, { useCallback, useEffect, useState } from 'react'
import { View, FlatList, TouchableOpacity, Platform, UIManager, LayoutAnimation, ToastAndroid, LogBox, ScrollView } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { firebase } from '@react-native-firebase/auth'
import { doc, getDoc, getFirestore } from '@react-native-firebase/firestore'

import { IcFilter, IcGrid, IcList, IcSearch, IcSortIcon, color, size } from '../../theme'
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
  const { favoriteProductIds, setFavoriteProductIds } = useMainContext()

  LogBox.ignoreLogs(['Encountered two children with the same key']);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSheetVisible, setSheetVisible] = useState(false);
  const [isSortOptionSelected, setIsSortOptionSelected] = useState(null);
  const [sortOptionName, setSortOptionName] = useState(null)
  const [showGrid, setShowGrid] = useState(false);
  const [title, showTitle] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const userDocId = firebase.firestore()
      .collection('users')
      .doc(userInfo.uid).id;

  const handleProductRemove = async (item) => {
    const userDocId = firebase.firestore()
      .collection('users')
      .doc(userInfo.uid).id;

    const productsSnapshot = await firebase.firestore().collection('products').get();
    const productList = productsSnapshot.docs.map(doc => {
      const productData = doc.data();
      return productData;
    });

    const docRef = doc(db, `users/${userDocId}/favoriteProducts/favoritesList`);
    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists) {
        const data = docSnap.data();
        const productIds = data.productIds || [];
        console.log('productIds: ', productIds);
        console.log('itemId: ', item.id)
        if (productIds.includes(item.id)) {
          const index = productIds.indexOf(item.id);
          productIds.splice(index, 1);
          await firebase.firestore().collection('users').doc(userInfo.uid)
            .collection('favoriteProducts')
            .doc('favoritesList')
            .update({
              productIds: productIds
            });
          console.log('Updated Firebase with productIds:', productIds);
          setFavoriteProductIds(productIds);
          const favoriteProducts = productList.filter(product => productIds.includes(product.id));
          setProducts(favoriteProducts);
        }
        // setFavoriteProductIds(productIds);
        // const favoriteProducts = productList.filter(product => productIds.includes(product.id));
        // setProducts(favoriteProducts)s
      } else {
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

  const renderProducts = ({ item }) => {
    return (
      <ProductCardMain
        onProductPress={() => { setSelectedProductId(item.id) }}
        productHorizontal={showGrid ? true : false}
        productTitle={item?.title}
        brandName={item?.brand}
        showRatings={true}
        ratingsCounts={item?.rating}
        ratings={item?.rating}
        showDiscount={showGrid ? false : true}
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
    const favoriteRef = firebase.firestore().collection('users').doc(userDocId)
    .collection('favoriteProducts')
    .doc('favoritesList');

    setLoading(true)
    const unsuscribe = favoriteRef.onSnapshot(async (doc) => {
      if(doc.exists) {
        const { productIds } = doc.data();
        if(productIds.length > 0) {
          const productsQuery = firebase.firestore().collection('products').where('id', 'in', productIds);
          const productSnapshot = await productsQuery.get();
          const products = productSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setProducts(products);
          setLoading(false)
        } else {
          setProducts([]);
          setLoading(false)
        }
      } 
      else {
        setProducts([]);
        setLoading(false)
      }
    });

    return () => unsuscribe();
  }, [userDocId])


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
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.flatList()}
            contentContainerStyle={{ paddingBottom: size.moderateScale(4), flexDirection: 'row', paddingRight: size.moderateScale(20) }}>
            {
              womenTopCategory.map((item, index) => {
                return (
                  <View style={styles.listItem()} key={index}>
                    <Text style={styles.listText()}>{item.name}</Text>
                  </View>
                )
              })
            }
          </ScrollView>
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

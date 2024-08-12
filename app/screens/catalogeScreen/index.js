import React, { useCallback, useEffect, useRef, useState } from 'react' 
import { View, FlatList, TouchableOpacity, Platform, UIManager, LayoutAnimation, ScrollView, Alert, LogBox, ToastAndroid } from 'react-native'
import { BottomSheetContainer, Button, Header, ProductCardMain, Screen, Text } from '../../components'
import { IcBackArrow, IcFilter, IcGrid, IcList, IcSearch, IcSortIcon, color, size } from '../../theme'

import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { loadProducts, toggleFavorite } from '../../redux'
import * as styles from './styles'
import { useMainContext } from '../../contexts/MainContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

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

//product sizes available
const sizes = ['XS', 'S', 'M', 'L', 'XL'];

export const CatalogeScreen = ({route}) => {

  const navigation = useNavigation();
  const { allProducts, setAllProducts } = useMainContext();

  const [showProductList, setShowProductList] = useState([]);
  const [isSheetVisible, setSheetVisible] = useState(false);
  const [sortOptionName, setSortOptionName] = useState(null)
  const [isSortOptionSelected, setIsSortOptionSelected] = useState(sortProductType[3])
  const [filters, setFilters] = useState(null)
  const [showGrid, setShowGrid] = useState(true);
  const [title, showTitle] = useState(false);
  const [isSizeSheetVisible, setSizeSheetVisible] = useState(false);
  const [userSizeOption, setUserSizeOption] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null)
  
  LogBox.ignoreLogs([
    'Tried to modify key `reduceMotion` of an object which has been already passed to a worklet'
  ]);

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

  const handleSortOptionChange = (sortOption) => {
    setSortOptionName(sortOption.name);
    setIsSortOptionSelected(sortOption);
    sortProducts(sortOption);
    setSheetVisible(false);
  }

  //selecting the user selected size option and when the user selected the size then only navigate to mainProductScreen
  const selectSizeHandler = (size) => {
    setUserSizeOption(size);
  };

  const handleNavigation = () => {
    if(!userSizeOption){
      Alert.alert(
        '',
        'Please select the size',
        [
          {
            text: 'OK',
            onPress: () => null,
          },
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel'
          }
        ]
      )
      setSizeSheetVisible(true);
    }else {
      navigation.navigate('mainProductScreen', { selectedSize: userSizeOption, productId: selectedProductId })
      setUserSizeOption(false)
      setSizeSheetVisible(false);
    }
  }

  //handling the sort option bottom sheet visibility
  const handleOpenPress = () => {
    setSheetVisible(true);
  }

  const handleClosePress = () => {
    setSheetVisible(false);
  }

  //handling the size bottom sheet visibility
  const handleClosePressSizeSheet = () => {
    setSizeSheetVisible(false);
  }

  const handleFavoriteBtn = async (item) => {
    const updatedProducts = showProductList.map((product) => {
      if (product.id === item.id) {
        return {
          ...product,
          isFavorite: !product.isFavorite,
        }
      }
      return product
    })
    setShowProductList(updatedProducts);

    const updateAllProducts = allProducts.map((product) => {
      if(product.id === item.id) {
        return {
          ...product,
          isFavorite: !product.isFavorite
        }
      }
      return product;
    })
    setAllProducts(updateAllProducts)

    try {
      await AsyncStorage.setItem('allProducts', JSON.stringify(updateAllProducts));
    } catch (error) {
      console.error('Failed to save the updated products to AsyncStorage:', error);
    }

    const message = item.isFavorite 
    ? `${item.name} removed from favs`
    : `${item.name} added to favs` 
    ToastAndroid.show(message, ToastAndroid.SHORT)
  };

  const filterProducts = () => {
    if(filters !== null) {
      let filteredProducts = allProducts;

      //filter by category
      if(filters.category && filters.category.length > 0) {
        filteredProducts = filteredProducts.filter((product) => {
         return product.categories && product.categories.some(category => filters.category.includes(category))
        })
      }

      // filter by size
      if (filters.size && filters.size.length > 0) {
        filteredProducts = filteredProducts.filter((product) => {
          return product.availableSizes && product.availableSizes.some(availableSize => filters.size.includes(availableSize))
        });
      }

      //filter by price
      const isPriceWithinRange = (originalPrice, priceRange) => {
        const [minPrice, maxPrice] = priceRange;
        return originalPrice >= minPrice && originalPrice <= maxPrice;
      };
      if (filters.priceRange) {
        filteredProducts = filteredProducts.filter(product => {
          return isPriceWithinRange(product.originalPrice, filters.priceRange);
        });
      }

      //filter by color
      if (filters.colors && filters.colors.length > 0) {
        filteredProducts = filteredProducts.filter(product =>{
          return product.availableColors && product.availableColors.some(availableColor => filters.colors.includes(availableColor))
        })
          
      }

      //filter by brands
      if (filters.brands && filters.brands.length > 0) {
        filteredProducts = filteredProducts.filter(product => {
          return product.brand && filters.brands.map(b => b.toLowerCase()).includes(product.brand.toLowerCase());
        });
       }

      setShowProductList(filteredProducts)
    }
    else {
      setShowProductList(allProducts)
    }
  }
  
  const renderProducts = ({item}) => {
    return (
        <ProductCardMain 
          onProductPress={() => {
            setSelectedProductId(item.id);
            setSizeSheetVisible(true);
          }}
          productHorizontal={showGrid ? true : false}
          productTitle={item?.name}
          brandName={item?.brand}
          showRatings={true}
          ratings={item?.ratings}
          ratingsCounts={item?.rating_count}
          showDiscount={showGrid ? false : item?.discount}
          originalPrice={item?.originalPrice}
          sellingPrice={item?.saleProductPrice}
          newProduct={showGrid ? false : item?.isProductNew}
          productImage={item?.images}
          topRightIcon={false}
          addToFavoriteIcon
          onAddToFavorite={() => handleFavoriteBtn(item)}
          isProductFavorite={item?.isProductFavorite ||item?.isFavorite}
          flotingBtnStyle={!showGrid ? styles.flotingButton() : styles.flotingButtonList()}
          customProductStyle={showGrid ? styles.productCardListItem() : styles.productCardGridItem()}
        />
      )
  }

  useFocusEffect(
    useCallback(() => {
      setShowProductList(allProducts)
    },[allProducts])
  )

  useFocusEffect(
    useCallback(() => {
      filterProducts()
    },[filters])
  )

  useEffect(() => {
    setIsSortOptionSelected(sortProductType[3])
    setSortOptionName(sortProductType[3].name)
  },[])

  useEffect(() => {
    const filtersFromParams = route.params?.filters || null;
    setFilters(filtersFromParams);
    filterProducts();
  }, [route.params?.filters, allProducts]);

  return (
      <Screen bgColor={color.white} translucent={true}>
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
            <ScrollView
            horizontal
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={{paddingBottom: size.moderateScale(4)}}>
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
                  showGrid ? ( <IcGrid /> ) : ( <IcList /> )
                }
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer(showGrid)}>
          {
            showGrid ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 80 }}
                data={showProductList}
                renderItem={renderProducts}
                key={'_'}
                keyExtractor={item => '_'+item.name}
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
        <BottomSheetContainer
          isVisible={isSheetVisible}
          onClose={handleClosePress}
          customHeight={'42%'}>
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
        <BottomSheetContainer
          isVisible={isSizeSheetVisible}
          onClose={handleClosePressSizeSheet}
          customHeight={'47%'}>
          <Text style={styles.titleBottomSheet()}>Select Size</Text>
          <View style={styles.sizeContainer()}>
          {
            sizes.map((size, index) => {
              const isSelected = size === userSizeOption;
              return (
                <TouchableOpacity onPress={() => selectSizeHandler(size)} activeOpacity={0.5} style={styles.sizeItem(isSelected)} key={index}>
                  <Text style={styles.sizeText(isSelected)}>{size}</Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
          <TouchableOpacity style={styles.sizeInfo()}>
            <Text style={styles.sizeInfoText()}>Size info</Text>
            <IcBackArrow style={styles.forwardArrow()} width={size.moderateScale(10)} height={size.moderateScale(10)} />
          </TouchableOpacity>
          <Button title='ADD TO CART' btnStyle={styles.button()} onPress={handleNavigation}/>
        </BottomSheetContainer>
      </Screen>
  )
}

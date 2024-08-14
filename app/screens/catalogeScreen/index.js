import React, { useCallback, useEffect, useRef, useState } from 'react' 
import { View, FlatList, TouchableOpacity, Platform, UIManager, LayoutAnimation, ScrollView, Alert, LogBox, ToastAndroid } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { useMainContext } from '../../contexts/MainContext'
import { IcBackArrow, IcFilter, IcGrid, IcList, IcSearch, IcSortIcon, color, size } from '../../theme'
import { BottomSheetContainer, Button, Header, ProductCardMain, Screen, Text } from '../../components'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { toggleFavorite } from '../../redux'
import axios from 'axios'

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
  const dispatch = useDispatch();
  const { categoryUrl } = route.params;
  console.log('categoryUrl: ', categoryUrl);
  const productsFetch = useSelector(state => state.product.products);


  const { allProducts, setAllProducts } = useMainContext();
  const [loading, setLoading] = useState(false)
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

  const showProductsByCategorySelected = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }
    setLoading(true);
    try {
      const response = await axios(categoryUrl.url,options);
      if(response.status === 200) {
        const products = response.data.products;
        setShowProductList(products);
        setLoading(false)
      }
    }
    catch (error) {
      console.log(error)
      setLoading(false)
    }
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

  /**sorting the product based on selection */
  const sortProducts = (sortOption) => {
    let sortedList = [...showProductList];
    switch (sortOption.id) {
      case 3: 
        sortedList.sort((a, b) => b.rating - a.rating);
        break;
      case 4:
        sortedList.sort((a, b) => a.price - b.price);
        break;
      case 5:
        sortedList.sort((a, b) => b.price - a.price);
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
    console.log('item: ', item)
    dispatch(toggleFavorite(item.id));
    const message = item.isFavorite 
    ? `${item.title} removed from favs`
    : `${item.title} added to favs` 
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
    // console.log('item: ', item)
    return (
        <ProductCardMain 
          onProductPress={() => {
            setSelectedProductId(item.id);
            setSizeSheetVisible(true);
          }}
          productHorizontal={showGrid ? true : false}
          productTitle={item?.title}
          brandName={item?.brand}
          showRatings={true}
          ratingsCounts={item?.rating}
          originalPrice={item?.price}
          newProduct={showGrid ? false : item?.isProductNew}
          productImage={item?.images[0]}
          topRightIcon={false}
          addToFavoriteIcon
          onAddToFavorite={() => handleFavoriteBtn(item)}
          isProductFavorite={item?.isFavorite}
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

  useFocusEffect(
    useCallback(() => {
      console.log('filters: ',route.params?.appliedFilters)
    },[route.params?.appliedFilters, allProducts])
  )

  useEffect(() => {
    setIsSortOptionSelected(sortProductType[3])
    setSortOptionName(sortProductType[3].name)
  },[])

  useEffect(() => {
    showProductsByCategorySelected()
  },[])

  useEffect(() => {
    const filtersFromParams = route.params?.appliedFilters || null;
    console.log('filters: ',filtersFromParams)    
    setFilters(filtersFromParams);
    filterProducts();
  }, [route.params?.appliedFilters, allProducts]);

  useEffect(() => {
    setShowProductList(productsFetch)
  },[])

  return (
      <Screen bgColor={color.white} translucent={true}>
        <Header
          title={title ? true : false}
          headerTitle={categoryUrl.name}
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
            {title ? null : (<Text style={styles.title()}>{categoryUrl.name}</Text>)}
          </View>
          <View style={styles.horizontalScroll(title)}>
            <View style={styles.flatList()}>
            <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: size.moderateScale(4),flexGrow: 1}}>
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
                keyExtractor={(item, index) => { 
                  const uniqueKey = item.id ? item.id.toString() : index.toString();
                  return `_${uniqueKey}`
                }}
              />
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={2}
                contentContainerStyle={{ paddingBottom: 80 }}
                data={showProductList}
                renderItem={renderProducts}
                key={'#'}
                keyExtractor={(item, index) => { 
                  const uniqueKey = item.id ? item.id.toString() : index.toString();
                  return `#${uniqueKey}`
                }}
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
